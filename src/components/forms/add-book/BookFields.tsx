import { inputClassName } from "@/components/forms/form-styles";

const categories = ["Fiction", "Science", "History", "Kids", "Others"] as const;

export default function BookFields() {
  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-semibold">
          Book Title
          <input name="title" type="text" required maxLength={160} placeholder="e.g. The Midnight Library" className={inputClassName} />
        </label>
        <label className="block text-sm font-semibold">
          Author Name
          <input name="author" type="text" required maxLength={120} placeholder="e.g. Matt Haig" className={inputClassName} />
        </label>
      </div>

      <label className="block text-sm font-semibold">
        Category
        <select name="category" required defaultValue="" className={inputClassName}>
          <option value="" disabled>Select a category</option>
          {categories.map((category) => <option key={category} value={category}>{category}</option>)}
        </select>
      </label>

      <label className="block text-sm font-semibold">
        Total Copies
        <input name="totalCopies" type="number" min={1} step={1} defaultValue={1} required className={inputClassName} />
      </label>

      <label className="block text-sm font-semibold">
        Short Description
        <textarea name="description" required minLength={10} maxLength={1000} rows={4} placeholder="What is this book about?" className={`${inputClassName} resize-y`} />
      </label>
    </>
  );
}
