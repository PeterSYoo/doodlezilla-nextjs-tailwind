# Doodlezilla

## Getting Started

App Link - [http://nudoodle.vercel.app/](http://nudoodle.vercel.app/)

## Wireframes & Database Models

![figma](https://i.imgur.com/ht4eyyq.jpg)
[https://www.figma.com/file/59myApT16LdQm9nxdVNFYY/Doodlezilla?node-id=0%3A1&t=cPQ4WkVXXtrXaaAo-0](https://www.figma.com/file/59myApT16LdQm9nxdVNFYY/Doodlezilla?node-id=0%3A1&t=cPQ4WkVXXtrXaaAo-0)

The finished app extended the designs from the the initial wireframe.

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

## App Features

### User can

- Sign up with username and email.
- Sign in with Google.
- Edit their profile.
- Change their avatar photo.
- Create new doodles.
- View doodles.
- Delete their doodles.
- View other user's doodles.
- Like their own or other user's doodles.
- Comment on their own or other user's doodles.
- Search for users.
- Toggle dark or light themes.

### General Features

- All pages are built responsively for mobile and desktop.
- All routes are protected on the server side, redirecting users if they are either logged in or not logged in.
- Light/Dark theme.
- Uses Cloudinary to host all doodles.
- Pagination on feed with infinite scroll.
- Sorts feed by most recent doodle.
- Sorts comments in doodles by most recent comment.
- Updates likes and comments in real time in feed and profiles by utilizing refetching after mutation events.
- Adds validation errors to React Hook Forms using Yup.
- Built Schemas for MongoDB using Mongoose.
- Created REST API routes for CRUD methods.
- Used React Query to help fetch the data from the API routes and then cache the data in the browsers memory.

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

Controller function for GET method in API route -

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

When we make a GET request to the API route, it will invoke the controller function for the GET method which will loop through all the documents in the Doodles collection in MongoDB. Then it will find Comments, LikesNum, and User documents using the referenced respective object id's living in the Doodle document. Then combine all the returned values into a new object. We added page as a query string which holds a default value of 1 unless stated otherwise. We also have a perPage value of 3, which will show 3 results per page. The skip variable represents the number of items to skip when on a page that's not the default 1st page. Also previousPage and nextPage variables will be used as cursors for our react query hook.

We call the API through a custom hook we created that's using the useInfiniteQuery hook from React Query.

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

The getNextPageParam function retrieves the next page of results using the `nextPage` prop on `lastPage` which is the last page of results that was retrieved.

```js
import { useInView } from 'react-intersection-observer';
```

```js
const { ref, inView } = useInView();
```

The useInView hook is used to track whether the element with the ref prop is in view. The inView variable is a boolean value that is true when the element is in view and false when it is not.

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

Place the button with the ref prop at the bottom of the page. Whenever inView boolean changes, fetch the next page of results.

## Liking System Problem

Currently, the way the liking system works is when a user clicks on a doodle to open up the modal for the 1st time, it will create a unique Likes document with a boolean prop. Then when the user clicks on the heart, if the heart is not filled in the onClick event will update the Likes document boolean value to true then it will create a LikesNum document. It would do the reverse when the user unclicks a filled in heart, deleting a LikesNum document. The likes are counted by how many LikesNum documents there are that's referencing the Doodle document.

The alternative is, instead of creating a LikesNum document, we increment a numerical value that's living as a prop on the Doodle document itself. I already tried implementing this method, but the response time was slower than the 1st method. It might be an issue with the free hosting, or some poor optimization on either the client side or API itself.

## Future Updates

- Following system
- Build out more Canvas API tools such as,
  - Erasing
  - Recording strokes, apply a background color, then apply the recorded strokes.
  - Layers
  - Optomize the touch events, make it usable for pen tablets.
