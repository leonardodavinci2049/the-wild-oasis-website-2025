import SelectCountry from "@/Common_components/SelectCountry";
import UpdateProfileForm from "./_components/UpdateProfileForm";
import { auth } from "@/services/auth";
import { getGuest } from "@/services/apiGuest";

export const metadata = {
  title: "Update profile",
};
const page = async () => {
  const session = await auth();
  if (!session || !session.user?.email) {
    // You can redirect, throw, or render an error here as appropriate
    return <div>Unable to load profile. Please sign in.</div>;
  }
  const guest = await getGuest(session.user.email);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-4">
        Update your guest profile
      </h2>

      <p className="text-lg mb-8 text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

       <UpdateProfileForm guest={guest}>
        <SelectCountry
           name="nationality"
          id="nationality"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          defaultCountry={guest.nationality}
        />
      </UpdateProfileForm>
    </div>
  );
};

export default page;
