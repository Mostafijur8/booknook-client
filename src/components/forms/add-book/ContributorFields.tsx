import { inputClassName } from "@/components/forms/form-styles";

type ContributorFieldsProps = {
  name: string;
  email: string;
};

export default function ContributorFields({ name, email }: ContributorFieldsProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <label className="block text-sm font-semibold">
        Your Name
        <input type="text" value={name} readOnly className={`${inputClassName} bg-[#f7f6f1]`} />
      </label>
      <label className="block text-sm font-semibold">
        Your Email
        <input type="email" value={email} readOnly className={`${inputClassName} bg-[#f7f6f1]`} />
      </label>
    </div>
  );
}
