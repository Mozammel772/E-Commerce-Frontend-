import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Controller, useForm } from "react-hook-form";
import {
    FaCamera,
    FaCheckCircle,
    FaEdit,
    FaEnvelope,
    FaMapMarkerAlt,
    FaPhone,
    FaUser,
} from "react-icons/fa";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import useAxioPublic from "../../hooks/useAxiosPublic";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const userEmail = user?.email;
  const axiosPublic = useAxioPublic();

  const {
    data: userData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["userData", userEmail],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/${userEmail}`);
      console.log(res.data);
      return res.data;
    },
    enabled: !!userEmail,
    refetchOnWindowFocus: true,
    staleTime: 0,
    cacheTime: 300000,
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm();

  const handleEditClick = () => setIsEditing(!isEditing);

  const handleProfileUpdate = async (data) => {
    setLoading(true);
    try {
      let imageUrl = userData?.imageUrl || null;

      if (image) {
        const formData = new FormData();
        formData.append("image", image);
        const imgbbApiKey = "a616b7cb4177b6d22010843ec1f12500";

        const imgbbResponse = await axiosPublic.post(
          `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
          formData
        );

        if (imgbbResponse.data && imgbbResponse.data.data.url) {
          imageUrl = imgbbResponse.data.data.url;
        } else {
          toast.error("Image upload failed! Please try again.");
          return;
        }
      }

      const updatedData = {
        name: data.name,
        address: data.address,
        phone: data.phone,
        email: data.email,
        imageUrl,
      };

      const response = await axiosPublic.patch(
        `/users/update/${userEmail}`,
        updatedData
      );
      console.log("update data", updatedData);
      if (response.status === 200) {
        refetch();
        setIsEditing(false);
        toast.success("Profile updated successfully!");
        reset(data);
      } else {
        toast.error("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Profile Update Error:", error);
      toast.error("An error occurred while updating your profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => setImage(e.target.files[0]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <Helmet>
        <title>Velonomics | Profile Management</title>
      </Helmet>
      <div className="container mx-auto">
        <div className="bg-base-200 rounded-lg shadow-2xl overflow-hidden ">
          <div className="p-8 md:p-12">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-xl font-bold text-black">
                Profile Management
              </h1>
              <button
                onClick={handleEditClick}
                className={`text-2xl p-2 rounded-full ${
                  isEditing
                    ? "bg-green-500 text-white"
                    : "bg-indigo-900 text-white hover:bg-gray-600"
                } transition-all duration-300 ease-in-out`}
                aria-label={isEditing ? "Save Profile" : "Edit Profile"}
              >
                {isEditing ? <FaCheckCircle /> : <FaEdit />}
              </button>
            </div>
            <div className="divider"></div>
            <div className="mb-12 text-center">
              <div className="relative inline-block">
                <img
                  className="w-40 h-40 rounded-full object-cover border-4 border-blue-500 shadow-lg"
                  src={
                    image
                      ? URL.createObjectURL(image)
                      : userData?.imageUrl ||
                        "https://ui-avatars.com/api/?name=Profile&background=4800ff&color=ffffff&size=150"
                  }
                  alt="Profile"
                  onLoad={(e) => image && URL.revokeObjectURL(e.target.src)}
                />

                {isEditing && (
                  <label
                    htmlFor="image-upload"
                    className="absolute bottom-0 right-0 bg-blue-500 text-white p-3 rounded-full cursor-pointer hover:bg-blue-600 transition-colors duration-200 shadow-lg"
                  >
                    <FaCamera />
                    <input
                      type="file"
                      id="image-upload"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              <h2 className="mt-4 text-2xl font-semibold">{`${
                userData?.name || ""
              } `}</h2>
              <p className="text-blue-400">{userData?.email}</p>
            </div>

            {isEditing ? (
              <form
                onSubmit={handleSubmit(handleProfileUpdate)}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <ProfileField
                    name="name"
                    label="Name"
                    control={control}
                    defaultValue={userData?.name}
                    rules={{
                      required: "Name is required",
                      pattern: {
                        value: /^[a-zA-Z\s]+$/,
                        message: "Name can only contain letters and spaces",
                      },
                    }}
                    icon={<FaUser className="text-blue-400" />}
                  />
                  <ProfileField
                    name="email"
                    label="Email Address"
                    control={control}
                    defaultValue={userData?.email || userEmail}
                    readOnly
                    icon={<FaEnvelope className="text-blue-400" />}
                  />
                  <ProfileField
                    name="address"
                    label="Residential Address"
                    control={control}
                    defaultValue={userData?.address}
                    rules={{ required: "Address is required" }}
                    icon={<FaMapMarkerAlt className="text-blue-400" />}
                  />
                  <ProfileField
                    name="phone"
                    label="Phone Number"
                    control={control}
                    defaultValue={userData?.phone}
                    rules={{
                      required: "Phone number is required",
                      pattern: {
                        value: /^[0-9]{11}$/,
                        message: "Enter a valid 11-digit phone number",
                      },
                    }}
                    icon={<FaPhone className="text-blue-400" />}
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      reset();
                    }}
                    className="px-6 py-3 rounded-lg text-lg font-semibold bg-gray-600 hover:bg-gray-700 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`px-6 py-3 rounded-lg text-lg font-semibold ${
                      loading || !isDirty
                        ? "bg-gray-600 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    } transition-colors duration-200`}
                    disabled={loading || !isDirty}
                  >
                    {loading ? "Updating..." : "Save Changes"}
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <ProfileInfo
                    label="name"
                    value={userData?.name}
                    icon={<FaUser />}
                  />
                  <ProfileInfo
                    label="Email Address"
                    value={userData?.email}
                    icon={<FaEnvelope />}
                  />
                  <ProfileInfo
                    label="Residential Address"
                    value={userData?.address}
                    icon={<FaMapMarkerAlt />}
                  />
                  <ProfileInfo
                    label="Phone Number"
                    value={userData?.phone}
                    icon={<FaPhone />}
                  />
                </div>
                <div className="bg-gray-700 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4 text-blue-400">
                    Profile Completeness
                  </h3>
                  <div className="flex items-center justify-between mb-2">
                    <span>Progress</span>
                    <span>{calculateProfileCompleteness(userData)}%</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2.5">
                    <div
                      className="bg-blue-500 h-2.5 rounded-full"
                      style={{
                        width: `${calculateProfileCompleteness(userData)}%`,
                      }}
                    ></div>
                  </div>
                  <p className="mt-4 text-sm text-gray-400">
                    Completing your profile helps us provide a better,
                    personalized experience.
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="bg-gray-900 p-6 text-center">
            <p className="text-sm text-gray-400">
              Last updated: {formatDate(userData?.updatedAt)} | Member since:{" "}
              {formatDate(userData?.createdAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileField = ({
  name,
  label,
  control,
  defaultValue,
  rules,
  icon,
  readOnly = false,
}) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium mb-2 text-gray-300"
    >
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {icon}
      </div>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue || ""}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <input
            {...field}
            id={name}
            readOnly={readOnly}
            className={`w-full pl-10 pr-3 py-2 bg-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
              error ? "border-red-500" : "border-gray-600"
            }`}
          />
        )}
      />
    </div>
    {rules && (
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ fieldState: { error } }) =>
          error && <p className="mt-1 text-sm text-red-500">{error.message}</p>
        }
      />
    )}
  </div>
);

const ProfileInfo = ({ label, value, icon }) => (
  <div className="bg-gray-700 p-6 rounded-lg flex items-start space-x-4">
    <div className="text-blue-400 mt-1">{icon}</div>
    <div>
      <p className="text-sm text-gray-400 mb-1">{label}</p>
      <p className="font-medium">{value || "Not provided"}</p>
    </div>
  </div>
);

const calculateProfileCompleteness = (userData) => {
  const fields = ["name", "email", "address", "phone", "imageUrl"];
  const filledFields = fields.filter((field) => userData && userData[field]);
  return Math.round((filledFields.length / fields.length) * 100);
};

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default Profile;