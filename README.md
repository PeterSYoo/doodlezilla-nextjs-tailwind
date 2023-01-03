# Nudoodle

## Getting Started

App Link - [https://nudoodle.vercel.app/](https://nudoodle.vercel.app/)

If you don't want to sign up, you can use the following credentials to log in.

```
Username: apple
Password: Abcd1234!
```

## Screenshots

![feed](https://i.imgur.com/i5bIBon.png)
![create](https://i.imgur.com/TwvLNmh.png)
![mobile](https://i.imgur.com/KzBDw7z.png)

## Wireframes & Database Models

![figma](https://i.imgur.com/w5hHJT7.jpg)
![figma](https://i.imgur.com/rPwxGBT.png)
[https://www.figma.com/file/59myApT16LdQm9nxdVNFYY/Doodlezilla?node-id=0%3A1&t=cPQ4WkVXXtrXaaAo-0](https://www.figma.com/file/59myApT16LdQm9nxdVNFYY/Doodlezilla?node-id=0%3A1&t=cPQ4WkVXXtrXaaAo-0)

The finished app design is slightly different from the initial wireframe due to design changes made during development.

## Technologies Used

- TypeScript
- NextJS
- NextAuth
- Next Font
- Next Themes
- MongoDB
- Mongoose
- Moment Timezone
- Bcrypt
- Tailwind CSS
- Tanstack React Query
- React Hook Form
- Yup
- Cloudinary
- Canvas API
- React Colorful
- React Icons
- React Intersection Observer

## Using Postman to Test Routes

![postman](https://i.imgur.com/ZtOxeeG.png)

## App Features

### Users can

- The User can sign up with a unique username and email address.
- The User can sign in with Google.
- The User can edit their profile and update their information.
- The User can change their avatar photo.
- The User can create new doodles.
- The User can view their own and other user's doodles.
- The User can delete their own doodles.
- The User can like and comment on their own or other user's doodles.
- The User can search for other users by username.
- The User can toggle between a light and dark theme.

### General Features

- Designed and implemented a responsive web application for both mobile and desktop devices.
- Implemented secure server-side routing to protect user access and redirect as needed.
- Offered a light/dark theme toggle.
- Utilized Cloudinary to host and manage all images (doodles).
- Incorporated pagination and infinite scroll on the feed to optimize performance and user experience.
- Sorted the feed by the most recent doodles and the comments in each doodle by the most recent comment.
- Enabled real-time updates for likes and comments in the feed and profiles through React Query refetching after mutation events.
- Validated user input using React Hook Form and Yup.
- Created MongoDB schemas and REST API routes for CRUD operations using Mongoose.
- Used React Query to fetch data from the API routes and cache it in the browser's memory.

## How I Built the Pagination

API route -
`/api/all-doodles-with-comments-and-likes?page=`

```js
const { method } = req;

switch (method) {
  case 'GET':
    getInfiniteQuriesAllDoodles(req, res);
    break;
  default:
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${method} Not Allowed`);
    break;
}
```

The controller function for the GET method in the API route that handles GET requests. -

```js
/* GET Infinite Scroll Pagination all Doodles */
export const getInfiniteQuriesAllDoodles = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const perPage = 3; // Number of doodles to display per page
    const page =
      typeof req.query.page === 'string' ? parseInt(req.query.page) : 1;

    // Calculate the skip value for pagination
    const skip = (page - 1) * perPage;

    const doodles = await Doodles.find()
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(perPage);

    if (!doodles) return res.status(404).json({ error: 'Doodles not Found' });
    if (doodles) {
      const combinedData = [];
      for (let i = 0; i < doodles.length; i++) {
        const comments = await Comments.find({ doodle: doodles[i]._id });
        const likesNum = await LikesNum.find({ doodle: doodles[i]._id });
        const user = await Users.findById(doodles[i].user);

        combinedData.push({
          doodle: doodles[i],
          likesNum: likesNum,
          comments: comments,
          user: user,
        });
      }

      // Calculate the previous and next page numbers
      const previousPage = page > 1 ? page - 1 : null;
      const nextPage = combinedData.length === perPage ? page + 1 : null;

      return res.status(200).json({ combinedData, previousPage, nextPage });
    }
  } catch (error) {
    res.status(404).json({ error: 'Error while fetching users doodles' });
  }
};
/*  */
```

The API route handles GET requests by invoking the controller function for the GET method. The controller function retrieves all documents in the Doodles collection in MongoDB, as well as Comments, LikesNum, and User documents referenced by the object id's in the Doodle documents. It combines the returned values into a new object and adds pagination using the `page` query string (default value: 1) and a `perPage` value of 3 (3 results per page). The `skip` variable represents the number of items to skip on pages other than the default first page. The `previousPage` and `nextPage` variables serve as cursors for the `useInfiniteQuery` hook from React Query, which is used in a custom hook to call the API.

```js
import { useInfiniteQuery } from '@tanstack/react-query';

const useInfiniteQueriesAllDoodles = () => {
  const {
    data: dataInfiniteQueriesAllDoodles,
    isLoading: isLoadingInfiniteQueriesAllDoodles,
    isError: isErrorInfiniteQueriesAllDoodles,
    error: errorInfiniteQueriesAllDoodles,
    hasNextPage: hasNextPageInfiniteQueriesAllDoodles,
    fetchNextPage: fetchNextPageInfiniteQueriesAllDoodles,
    isFetching: isFetchingInfiniteQueriesAllDoodles,
    isFetchingNextPage: isFetchingNextPageInfiniteQueriesAllDoodles,
    refetch: refetchInfiniteQueriesAllDoodles,
  } = useInfiniteQuery(
    ['infiniteQueriesAllDoodles'],
    async ({ pageParam = 1 }) => {
      try {
        const response = await fetch(
          `/api/all-doodles-with-comments-and-likes?page=${pageParam}`
        );
        return response.json();
      } catch (error) {
        throw error;
      }
    },
    {
      getNextPageParam: (lastPage, pages) => lastPage.nextPage,
    }
  );

  return {
    dataInfiniteQueriesAllDoodles,
    isLoadingInfiniteQueriesAllDoodles,
    isErrorInfiniteQueriesAllDoodles,
    errorInfiniteQueriesAllDoodles,
    hasNextPageInfiniteQueriesAllDoodles,
    fetchNextPageInfiniteQueriesAllDoodles,
    isFetchingInfiniteQueriesAllDoodles,
    isFetchingNextPageInfiniteQueriesAllDoodles,
    refetchInfiniteQueriesAllDoodles,
  };
};

export default useInfiniteQueriesAllDoodles;
```

The `getNextPageParam` function retrieves the next page of results by using the `nextPage` prop on the `lastPage` object, which represents the last page of results that was retrieved.

```js
import { useInView } from 'react-intersection-observer';
```

```js
const { ref, inView } = useInView();
```

The `useInView` hook tracks whether the element with the `ref` prop is in view. The `inView` variable is a boolean value that is `true` when the element is in view and `false` when it is not.

```js
useEffect(() => {
  if (inView && hasNextPageInfiniteQueriesAllDoodles) {
    fetchNextPageInfiniteQueriesAllDoodles();
  }
}, [inView]);
```

```js
<div className="flex flex-col justify-center mb-48 md:-ml-10 md:mb-20">
  <button
    ref={ref}
    onClick={() => fetchNextPageInfiniteQueriesAllDoodles()}
    disabled={
      !hasNextPageInfiniteQueriesAllDoodles ||
      isFetchingNextPageInfiniteQueriesAllDoodles
    }
    className="text-placeholder text-xs mb-5"
  >
    {isFetchingNextPageInfiniteQueriesAllDoodles ? (
      <LoaderSpinnerInline />
    ) : hasNextPageInfiniteQueriesAllDoodles ? (
      'Load Newer'
    ) : (
      'Nothing more to load'
    )}
  </button>
  {isFetchingInfiniteQueriesAllDoodles &&
  !isFetchingNextPageInfiniteQueriesAllDoodles ? (
    <LoaderSpinnerInline />
  ) : null}
</div>
```

To implement the pagination, placed the button with the `ref` prop at the bottom of the page. Whenever the `inView` boolean value changes, fetches the next page of results.

## Liking System Problem

The response time for liking and unliking a doodle is slow on the Vercel app.

Currently, the liking system works as follows: when a user clicks on a doodle to open the modal for the first time, a unique Likes document with a boolean prop is created. When the user clicks on the heart, the onClick event updates the Likes document's boolean value to true and creates a LikesNum document if the heart is not filled in. If the heart is already filled, the event sets the boolean prop to false and deletes the LikesNum document. The number of likes for a doodle is counted by the number of LikesNum documents referencing the Doodle document.

An alternative approach is to increment a numerical value as a prop on the Doodle document itself instead of creating a LikesNum document. However, this method resulted in slower response times compared to the current approach so I opted for the 1st approach, which is still slow.

## Future Updates

- Implement a feature that allows users to follow other users or content.
- Improve the Canvas API tools by adding the ability to erase drawings, record strokes and apply a background color, use layers, and optimize touch events for use with pen tablets.

## If I had to refactor

I realized that I could have made things easier by designing the schemas with more one-to-one relationships, such as a relationship between a user and a specific comment or a boolean for likes associated with that user. This would have eliminated the need for extra work on the API layer to transform many one-to-many relationships into one-to-one relationships.
