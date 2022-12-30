import { ChangeEvent, use, useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import useFetchUser from '../../hooks/useFetchUser';
import useUpdateSessionUser from '../../hooks/useUpdateSessionUser';
import { LoaderSpinner } from '../LoaderSpinner.components';
import { LoaderSpinnerInline } from '../LoaderSpinnerInline.components';
import { BsFillExclamationCircleFill } from 'react-icons/bs';
import { RiCloseFill } from 'react-icons/ri';
import { ProfileUsernameErrorModal } from './ProfileUsernameErrorModal.components';

type Inputs = {
  username: string;
  biography: string;
  location: string;
};

type HandleOnChangeEvent = ChangeEvent<HTMLInputElement>;

const EditSchema = Yup.object().shape({
  username: Yup.string()
    .required('Please Enter a Username')
    .min(2, 'Too short!')
    .max(14, 'Too long!')
    .matches(/^[0-9a-zA-Z]+$/, 'Only letters and numbers allowed, no spaces.'),
  biography: Yup.string()
    .required('Please Enter a Biography')
    .min(2, 'Too Short!')
    .max(230, 'Too long!')
    .matches(/^[0-9a-zA-Z]/, 'Only letters and numbers allowed.'),
});

type DoodleCardModalProps = {
  setIsModal: (isModal: boolean) => void;
};
export const ProfileEditModal = ({ setIsModal }: DoodleCardModalProps) => {
  const { data: session }: any = useSession();
  const [imageSrc, setImageSrc] = useState<string>('');
  const [isUsernameErrorModal, setIsUsernameErrorModal] =
    useState<boolean>(false);
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const { userData, userIsLoading, userIsError, userRefetch } = useFetchUser(
    session?.user?.id
  );

  const { mutateUpdateSessionUser, isLoadingUpdateSessionUser } =
    useUpdateSessionUser(
      session?.user?.id,
      setIsUsernameErrorModal,
      setIsModal
    );

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(EditSchema),
  });

  const handleInputFileClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const handleOnChange = async (e: HandleOnChangeEvent) => {
    e.preventDefault();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const formData = new FormData();

      formData.append('file', file);
      formData.append('upload_preset', 'Nudoodle-avatars');

      const data = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      ).then((res) => res.json());

      if (!data.error) {
        setImageSrc(data.secure_url);
      }
    }
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!imageSrc) {
      await mutateUpdateSessionUser({
        name: data.username.toLowerCase(),
        image: userData.image,
        biography: data.biography,
        location: data.location,
      });
      await userRefetch();
    } else {
      await mutateUpdateSessionUser({
        name: data.username.toLowerCase(),
        image: imageSrc,
        biography: data.biography,
        location: data.location,
      });
      await userRefetch();
    }
  };

  if (userIsLoading) return <LoaderSpinner />;
  if (userIsError) return <>Error</>;

  return (
    <>
      {isUsernameErrorModal ? (
        <ProfileUsernameErrorModal
          setIsUsernameErrorModal={setIsUsernameErrorModal}
        />
      ) : null}
      <div className="fixed top-0 left-0 z-40 flex h-screen w-full items-center justify-center bg-black bg-opacity-50 dark:bg-white dark:bg-opacity-50">
        <div className="container mx-auto w-11/12 md:max-w-[768px]">
          <div className="relative flex flex-col items-center gap-6 rounded-3xl bg-white pb-12 dark:bg-midnight md:grid md:grid-cols-12 md:items-start md:gap-0 md:pb-14">
            {/* Close X Top Right Button */}
            <div className="flex w-full justify-end">
              <span
                onClick={() => setIsModal(false)}
                className="mx-5 mt-3 cursor-pointer text-3xl hover:text-sunset dark:text-egg dark:hover:text-sunset md:hidden"
              >
                <RiCloseFill />
              </span>
            </div>
            {/*  */}
            {/* Edit Avatar Photo */}
            <div className="flex w-full flex-col items-center justify-end gap-5 md:col-span-4 md:col-start-1 md:ml-20 md:h-full md:items-center md:gap-12">
              <div className="flex w-full items-center justify-center gap-6 md:mt-5 md:h-full md:justify-center md:gap-0">
                {/* Avatar */}
                <Image
                  src={
                    userData.image
                      ? userData.image
                      : 'https://res.cloudinary.com/dryh1nvhk/image/upload/v1671393782/nudoodle/assets/user-avatar_th6utq.png'
                  }
                  width={200}
                  height={200}
                  alt="profile avatar mobile"
                  className={
                    imageSrc === ''
                      ? 'z-10 aspect-square rounded-full'
                      : 'hidden'
                  }
                />
                <Image
                  src={imageSrc === '' ? userData.image : imageSrc}
                  width={200}
                  height={200}
                  alt="profile avatar mobile"
                  className={
                    imageSrc === ''
                      ? 'hidden'
                      : 'absolute top-[81px] z-10 aspect-square rounded-full'
                  }
                />
                {/*  */}
              </div>
              <input
                type="file"
                name="file"
                onChangeCapture={handleOnChange}
                ref={inputFileRef}
                hidden
              />
              <button
                onClick={handleInputFileClick}
                className="flex cursor-pointer items-center justify-center rounded-full border border-placeholder bg-gradient-to-tr py-2 px-5 font-bold transition duration-75 ease-in-out hover:animate-button hover:border-white hover:from-[#F97E1C] hover:via-sunset hover:to-[#D055D3] hover:bg-[length:400%_400%] hover:text-white dark:border-shadeDark dark:text-egg dark:hover:border-transparent"
              >
                Edit Avatar Photo
              </button>
            </div>
            {/*  */}
            {/* Start of Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="md:col-span-7 md:col-start-6"
            >
              {/* Close X Top Right Button */}
              <div className="flex w-full justify-end">
                <span
                  onClick={() => setIsModal(false)}
                  className="mx-5 mt-3 hidden cursor-pointer text-3xl hover:text-sunset dark:text-egg dark:hover:text-sunset md:flex"
                >
                  <RiCloseFill />
                </span>
              </div>
              {/*  */}
              <div className="mb-10 flex flex-col items-center justify-center gap-3">
                {/* Username */}
                <p className="-mb-3 w-[310px] pl-3 text-sm text-placeholder dark:text-shadeText">
                  Username:
                </p>
                <label
                  className={
                    errors.username
                      ? 'w-[310px] rounded-xl border border-red-600 bg-zinc-50 py-2 px-4 dark:bg-shadeMedium'
                      : 'w-[310px] rounded-xl border border-grayBorder bg-zinc-50 py-2 px-4 dark:border-transparent dark:bg-shadeMedium'
                  }
                >
                  <input
                    placeholder="Username"
                    defaultValue={userData.name ? userData.name : null}
                    type="text"
                    className="w-full bg-zinc-50 focus:outline-none dark:bg-shadeMedium dark:text-egg dark:placeholder:text-shadeText"
                    {...register('username')}
                  />
                </label>
                {errors.username && (
                  <>
                    {errors.username.message ===
                    'Please Enter a Username' ? null : (
                      <div className="mx-auto -mt-2 grid max-w-[260px] grid-cols-12 text-xs text-red-600">
                        <div className="col-span-1 col-start-1">
                          <BsFillExclamationCircleFill className="mt-0.5" />
                        </div>
                        <div className="col-span-11 col-start-2">
                          <p className="break-all">{errors.username.message}</p>
                        </div>
                      </div>
                    )}
                  </>
                )}
                {/*  */}
                {/* Biography */}
                <p className="-mb-3 w-[310px] pl-3 text-sm text-placeholder dark:text-shadeText">
                  Biography:
                </p>
                <label
                  className={
                    errors.biography
                      ? 'w-[310px] rounded-xl border border-red-600 bg-zinc-50 py-2 px-4 dark:bg-shadeMedium'
                      : 'w-[310px] rounded-xl border border-grayBorder bg-zinc-50 py-2 px-4 dark:border-transparent dark:bg-shadeMedium'
                  }
                >
                  <textarea
                    placeholder="Biography"
                    defaultValue={userData.biography ? userData.biography : ''}
                    className="w-full overflow-auto rounded-xl bg-zinc-50 focus:outline-none dark:bg-shadeMedium dark:text-egg dark:placeholder:text-shadeText"
                    {...register('biography')}
                  />
                </label>
                {errors.biography && (
                  <>
                    {errors.biography.message ===
                    'Please Enter a Biography' ? null : (
                      <div className="mx-auto -mt-2 grid max-w-[260px] grid-cols-12 gap-2 text-xs text-red-600">
                        <div className="col-span-1 col-start-1">
                          <BsFillExclamationCircleFill className="mt-0.5" />
                        </div>
                        <div className="col-span-11 col-start-2">
                          <p className="break-all">
                            {errors.biography.message}
                          </p>
                        </div>
                      </div>
                    )}
                  </>
                )}
                {/*  */}
                {/* Location */}
                <p className="-mb-3 w-[310px] pl-3 text-sm text-placeholder dark:text-shadeText">
                  Location:
                </p>
                <label
                  className={
                    errors.location
                      ? 'w-[310px] rounded-xl border border-red-600 bg-zinc-50 py-2 px-4 dark:bg-shadeMedium'
                      : 'w-[310px] rounded-xl border border-grayBorder bg-zinc-50 py-2 px-4 dark:border-transparent dark:bg-shadeMedium'
                  }
                >
                  <select
                    defaultValue={userData.location ? userData.location : ''}
                    className="w-full bg-zinc-50 focus:outline-none dark:bg-shadeMedium dark:text-egg dark:placeholder:text-shadeText"
                    {...register('location')}
                  >
                    <option value="">Select a Country</option>
                    <option value="Afghanistan">Afghanistan</option>
                    <option value="Aland Islands">Åland Islands</option>
                    <option value="Albania">Albania</option>
                    <option value="Algeria">Algeria</option>
                    <option value="American Samoa">American Samoa</option>
                    <option value="Andorra">Andorra</option>
                    <option value="Angola">Angola</option>
                    <option value="Anguilla">Anguilla</option>
                    <option value="Antarctica">Antarctica</option>
                    <option value="Antigua and Barbuda">
                      Antigua & Barbuda
                    </option>
                    <option value="Argentina">Argentina</option>
                    <option value="Armenia">Armenia</option>
                    <option value="Aruba">Aruba</option>
                    <option value="Australia">Australia</option>
                    <option value="Austria">Austria</option>
                    <option value="Azerbaijan">Azerbaijan</option>
                    <option value="Bahamas">Bahamas</option>
                    <option value="Bahrain">Bahrain</option>
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="Barbados">Barbados</option>
                    <option value="Belarus">Belarus</option>
                    <option value="Belgium">Belgium</option>
                    <option value="Belize">Belize</option>
                    <option value="Benin">Benin</option>
                    <option value="Bermuda">Bermuda</option>
                    <option value="Bhutan">Bhutan</option>
                    <option value="Bolivia">Bolivia</option>
                    <option value="Bonaire, Sint Eustatius and Saba">
                      Caribbean Netherlands
                    </option>
                    <option value="Bosnia and Herzegovina">
                      Bosnia & Herzegovina
                    </option>
                    <option value="Botswana">Botswana</option>
                    <option value="Bouvet Island">Bouvet Island</option>
                    <option value="Brazil">Brazil</option>
                    <option value="British Indian Ocean Territory">
                      British Indian Ocean Territory
                    </option>
                    <option value="Brunei Darussalam">Brunei</option>
                    <option value="Bulgaria">Bulgaria</option>
                    <option value="Burkina Faso">Burkina Faso</option>
                    <option value="Burundi">Burundi</option>
                    <option value="Cambodia">Cambodia</option>
                    <option value="Cameroon">Cameroon</option>
                    <option value="Canada">Canada</option>
                    <option value="Cape Verde">Cape Verde</option>
                    <option value="Cayman Islands">Cayman Islands</option>
                    <option value="Central African Republic">
                      Central African Republic
                    </option>
                    <option value="Chad">Chad</option>
                    <option value="Chile">Chile</option>
                    <option value="China">China</option>
                    <option value="Christmas Island">Christmas Island</option>
                    <option value="Cocos (Keeling) Islands">
                      Cocos (Keeling) Islands
                    </option>
                    <option value="Colombia">Colombia</option>
                    <option value="Comoros">Comoros</option>
                    <option value="Congo">Congo - Brazzaville</option>
                    <option value="Congo, Democratic Republic of the Congo">
                      Congo - Kinshasa
                    </option>
                    <option value="Cook Islands">Cook Islands</option>
                    <option value="Costa Rica">Costa Rica</option>
                    <option value="Cote D'Ivoire">Côte d’Ivoire</option>
                    <option value="Croatia">Croatia</option>
                    <option value="Cuba">Cuba</option>
                    <option value="Curacao">Curaçao</option>
                    <option value="Cyprus">Cyprus</option>
                    <option value="Czech Republic">Czechia</option>
                    <option value="Denmark">Denmark</option>
                    <option value="Djibouti">Djibouti</option>
                    <option value="Dominica">Dominica</option>
                    <option value="Dominican Republic">
                      Dominican Republic
                    </option>
                    <option value="Ecuador">Ecuador</option>
                    <option value="Egypt">Egypt</option>
                    <option value="El Salvador">El Salvador</option>
                    <option value="Equatorial Guinea">Equatorial Guinea</option>
                    <option value="Eritrea">Eritrea</option>
                    <option value="Estonia">Estonia</option>
                    <option value="Ethiopia">Ethiopia</option>
                    <option value="Falkland Islands (Malvinas)">
                      Falkland Islands (Islas Malvinas)
                    </option>
                    <option value="Faroe Islands">Faroe Islands</option>
                    <option value="Fiji">Fiji</option>
                    <option value="Finland">Finland</option>
                    <option value="France">France</option>
                    <option value="French Guiana">French Guiana</option>
                    <option value="French Polynesia">French Polynesia</option>
                    <option value="French Southern Territories">
                      French Southern Territories
                    </option>
                    <option value="Gabon">Gabon</option>
                    <option value="Gambia">Gambia</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Germany">Germany</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Gibraltar">Gibraltar</option>
                    <option value="Greece">Greece</option>
                    <option value="Greenland">Greenland</option>
                    <option value="Grenada">Grenada</option>
                    <option value="Guadeloupe">Guadeloupe</option>
                    <option value="Guam">Guam</option>
                    <option value="Guatemala">Guatemala</option>
                    <option value="Guernsey">Guernsey</option>
                    <option value="Guinea">Guinea</option>
                    <option value="Guinea-Bissau">Guinea-Bissau</option>
                    <option value="Guyana">Guyana</option>
                    <option value="Haiti">Haiti</option>
                    <option value="Heard Island and Mcdonald Islands">
                      Heard & McDonald Islands
                    </option>
                    <option value="Holy See (Vatican City State)">
                      Vatican City
                    </option>
                    <option value="Honduras">Honduras</option>
                    <option value="Hong Kong">Hong Kong</option>
                    <option value="Hungary">Hungary</option>
                    <option value="Iceland">Iceland</option>
                    <option value="India">India</option>
                    <option value="Indonesia">Indonesia</option>
                    <option value="Iran, Islamic Republic of">Iran</option>
                    <option value="Iraq">Iraq</option>
                    <option value="Ireland">Ireland</option>
                    <option value="Isle of Man">Isle of Man</option>
                    <option value="Israel">Israel</option>
                    <option value="Italy">Italy</option>
                    <option value="Jamaica">Jamaica</option>
                    <option value="Japan">Japan</option>
                    <option value="Jersey">Jersey</option>
                    <option value="Jordan">Jordan</option>
                    <option value="Kazakhstan">Kazakhstan</option>
                    <option value="Kenya">Kenya</option>
                    <option value="Kiribati">Kiribati</option>
                    <option value="Korea, Democratic People's Republic of">
                      North Korea
                    </option>
                    <option value="Korea, Republic of">South Korea</option>
                    <option value="Kosovo">Kosovo</option>
                    <option value="Kuwait">Kuwait</option>
                    <option value="Kyrgyzstan">Kyrgyzstan</option>
                    <option value="Lao People's Democratic Republic">
                      Laos
                    </option>
                    <option value="Latvia">Latvia</option>
                    <option value="Lebanon">Lebanon</option>
                    <option value="Lesotho">Lesotho</option>
                    <option value="Liberia">Liberia</option>
                    <option value="Libyan Arab Jamahiriya">Libya</option>
                    <option value="Liechtenstein">Liechtenstein</option>
                    <option value="Lithuania">Lithuania</option>
                    <option value="Luxembourg">Luxembourg</option>
                    <option value="Macao">Macao</option>
                    <option value="Macedonia, the Former Yugoslav Republic of">
                      North Macedonia
                    </option>
                    <option value="Madagascar">Madagascar</option>
                    <option value="Malawi">Malawi</option>
                    <option value="Malaysia">Malaysia</option>
                    <option value="Maldives">Maldives</option>
                    <option value="Mali">Mali</option>
                    <option value="Malta">Malta</option>
                    <option value="Marshall Islands">Marshall Islands</option>
                    <option value="Martinique">Martinique</option>
                    <option value="Mauritania">Mauritania</option>
                    <option value="Mauritius">Mauritius</option>
                    <option value="Mayotte">Mayotte</option>
                    <option value="Mexico">Mexico</option>
                    <option value="Micronesia, Federated States of">
                      Micronesia
                    </option>
                    <option value="Moldova, Republic of">Moldova</option>
                    <option value="Monaco">Monaco</option>
                    <option value="Mongolia">Mongolia</option>
                    <option value="Montenegro">Montenegro</option>
                    <option value="Montserrat">Montserrat</option>
                    <option value="Morocco">Morocco</option>
                    <option value="Mozambique">Mozambique</option>
                    <option value="Myanmar">Myanmar (Burma)</option>
                    <option value="Namibia">Namibia</option>
                    <option value="Nauru">Nauru</option>
                    <option value="Nepal">Nepal</option>
                    <option value="Netherlands">Netherlands</option>
                    <option value="Netherlands Antilles">Curaçao</option>
                    <option value="New Caledonia">New Caledonia</option>
                    <option value="New Zealand">New Zealand</option>
                    <option value="Nicaragua">Nicaragua</option>
                    <option value="Niger">Niger</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Niue">Niue</option>
                    <option value="Norfolk Island">Norfolk Island</option>
                    <option value="Northern Mariana Islands">
                      Northern Mariana Islands
                    </option>
                    <option value="Norway">Norway</option>
                    <option value="Oman">Oman</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="Palau">Palau</option>
                    <option value="Palestinian Territory, Occupied">
                      Palestine
                    </option>
                    <option value="Panama">Panama</option>
                    <option value="Papua New Guinea">Papua New Guinea</option>
                    <option value="Paraguay">Paraguay</option>
                    <option value="Peru">Peru</option>
                    <option value="Philippines">Philippines</option>
                    <option value="Pitcairn">Pitcairn Islands</option>
                    <option value="Poland">Poland</option>
                    <option value="Portugal">Portugal</option>
                    <option value="Puerto Rico">Puerto Rico</option>
                    <option value="Qatar">Qatar</option>
                    <option value="Reunion">Réunion</option>
                    <option value="Romania">Romania</option>
                    <option value="Russian Federation">Russia</option>
                    <option value="Rwanda">Rwanda</option>
                    <option value="Saint Barthelemy">St. Barthélemy</option>
                    <option value="Saint Helena">St. Helena</option>
                    <option value="Saint Kitts and Nevis">
                      St. Kitts & Nevis
                    </option>
                    <option value="Saint Lucia">St. Lucia</option>
                    <option value="Saint Martin">St. Martin</option>
                    <option value="Saint Pierre and Miquelon">
                      St. Pierre & Miquelon
                    </option>
                    <option value="Saint Vincent and the Grenadines">
                      St. Vincent & Grenadines
                    </option>
                    <option value="Samoa">Samoa</option>
                    <option value="San Marino">San Marino</option>
                    <option value="Sao Tome and Principe">
                      São Tomé & Príncipe
                    </option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="Senegal">Senegal</option>
                    <option value="Serbia">Serbia</option>
                    <option value="Serbia and Montenegro">Serbia</option>
                    <option value="Seychelles">Seychelles</option>
                    <option value="Sierra Leone">Sierra Leone</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Sint Maarten">Sint Maarten</option>
                    <option value="Slovakia">Slovakia</option>
                    <option value="Slovenia">Slovenia</option>
                    <option value="Solomon Islands">Solomon Islands</option>
                    <option value="Somalia">Somalia</option>
                    <option value="South Africa">South Africa</option>
                    <option value="South Georgia and the South Sandwich Islands">
                      South Georgia & South Sandwich Islands
                    </option>
                    <option value="South Sudan">South Sudan</option>
                    <option value="Spain">Spain</option>
                    <option value="Sri Lanka">Sri Lanka</option>
                    <option value="Sudan">Sudan</option>
                    <option value="Suriname">Suriname</option>
                    <option value="Svalbard and Jan Mayen">
                      Svalbard & Jan Mayen
                    </option>
                    <option value="Swaziland">Eswatini</option>
                    <option value="Sweden">Sweden</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="Syrian Arab Republic">Syria</option>
                    <option value="Taiwan, Province of China">Taiwan</option>
                    <option value="Tajikistan">Tajikistan</option>
                    <option value="Tanzania, United Republic of">
                      Tanzania
                    </option>
                    <option value="Thailand">Thailand</option>
                    <option value="Timor-Leste">Timor-Leste</option>
                    <option value="Togo">Togo</option>
                    <option value="Tokelau">Tokelau</option>
                    <option value="Tonga">Tonga</option>
                    <option value="Trinidad and Tobago">
                      Trinidad & Tobago
                    </option>
                    <option value="Tunisia">Tunisia</option>
                    <option value="Turkey">Turkey</option>
                    <option value="Turkmenistan">Turkmenistan</option>
                    <option value="Turks and Caicos Islands">
                      Turks & Caicos Islands
                    </option>
                    <option value="Tuvalu">Tuvalu</option>
                    <option value="Uganda">Uganda</option>
                    <option value="Ukraine">Ukraine</option>
                    <option value="United Arab Emirates">
                      United Arab Emirates
                    </option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="United States Minor Outlying Islands">
                      U.S. Outlying Islands
                    </option>
                    <option value="Uruguay">Uruguay</option>
                    <option value="Uzbekistan">Uzbekistan</option>
                    <option value="Vanuatu">Vanuatu</option>
                    <option value="Venezuela">Venezuela</option>
                    <option value="Viet Nam">Vietnam</option>
                    <option value="Virgin Islands, British">
                      British Virgin Islands
                    </option>
                    <option value="Virgin Islands, U.s.">
                      U.S. Virgin Islands
                    </option>
                    <option value="Wallis and Futuna">Wallis & Futuna</option>
                    <option value="Western Sahara">Western Sahara</option>
                    <option value="Yemen">Yemen</option>
                    <option value="Zambia">Zambia</option>
                    <option value="Zimbabwe">Zimbabwe</option>
                  </select>
                </label>
                {errors.location && (
                  <>
                    {errors.location.message ===
                    'Please Enter a Location' ? null : (
                      <div className="mx-auto -mt-2 grid max-w-[260px] grid-cols-12 text-xs text-red-600">
                        <div className="col-span-1 col-start-1">
                          <BsFillExclamationCircleFill className="mt-0.5" />
                        </div>
                        <div className="col-span-11 col-start-2">
                          <p className="break-all">{errors.location.message}</p>
                        </div>
                      </div>
                    )}
                  </>
                )}
                {/*  */}
              </div>
              <div className="mr-22 flex w-full justify-center gap-5">
                {/* Cancel Button */}
                <span
                  onClick={() => setIsModal(false)}
                  className="flex cursor-pointer items-center justify-center rounded-full border border-placeholder bg-gradient-to-tr py-1 px-5 font-bold transition duration-75 ease-in-out hover:animate-button hover:border-white hover:from-[#F97E1C] hover:via-sunset hover:to-[#D055D3] hover:bg-[length:400%_400%] hover:text-white dark:border-shadeDark dark:text-egg dark:hover:border-transparent"
                >
                  Cancel
                </span>
                {/*  */}
                {/* Submit Button */}
                {isLoadingUpdateSessionUser ? (
                  <span className="flex cursor-default items-center justify-center gap-3 rounded-full bg-gradient-to-t from-gray-700 to-gray-500 py-2 px-10 font-semibold text-white">
                    <LoaderSpinnerInline />
                  </span>
                ) : (
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-3 rounded-full bg-gradient-to-t from-[#5755D3] to-cobalt py-2 px-5 font-semibold text-white transition duration-300 ease-in-out hover:animate-button hover:from-[#F97E1C] hover:via-sunset hover:to-[#5755D3] hover:bg-[length:400%_400%]"
                  >
                    Submit
                  </button>
                )}
                {/*  */}
              </div>
            </form>
            {/*  */}
          </div>
        </div>
      </div>
    </>
  );
};
