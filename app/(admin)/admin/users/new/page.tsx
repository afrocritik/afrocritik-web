import { redirect } from "next/navigation";

// Users sign themselves up; admins manage role/status from the list.
export default function Page() {
  redirect("/admin/users");
}
