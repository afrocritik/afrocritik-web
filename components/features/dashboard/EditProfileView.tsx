"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
import { Camera, ChevronLeft, Loader2, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";
import { cn, getImageUrl, getRoleLabel } from "@/lib/utils";

// Users.interests is a fixed list in the CMS (value → label).
const INTEREST_OPTIONS: Record<string, string> = {
  culture: "Culture",
  music: "Music",
  film: "Film",
  literature: "Literature",
  reports: "Reports",
  "african-philosophy": "African Philosophy",
  afrobeat: "Afrobeat",
  archive: "Archive",
  "african-history": "African History",
  biography: "Biography",
  "book-review": "Book Review",
};

const MAX_AVATAR = 2 * 1024 * 1024;

const inputClass =
  "h-16 w-full rounded-md bg-transparent px-3 font-inter text-base font-extralight text-white shadow-sm outline outline-1 -outline-offset-1 outline-yellow-700/15 placeholder:text-white/30 focus:outline-2 focus:outline-yellow-700/60 disabled:cursor-not-allowed disabled:text-white/50";

function Field({
  label,
  className,
  children,
}: Readonly<{ label: string; className?: string; children: React.ReactNode }>) {
  return (
    <label className={cn("flex flex-col gap-[13px]", className)}>
      <span className="font-inter text-base text-white">{label}</span>
      {children}
    </label>
  );
}

const toBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result).split(",")[1] ?? "");
    r.onerror = reject;
    r.readAsDataURL(file);
  });

export function EditProfileView() {
  const router = useRouter();
  const { data: session } = useSession();
  const token = (session?.user as { token?: string } | undefined)?.token;
  const { data: user, isLoading } = useCurrentUser();
  const queryClient = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    name: "",
    username: "",
    pronouns: "",
    location: "",
    website: "",
    twitter: "",
    facebook: "",
    instagram: "",
    tagline: "",
    bio: "",
    isProfilePublic: false,
  });
  const [interests, setInterests] = useState<string[]>([]);
  const [interestInput, setInterestInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [photoBusy, setPhotoBusy] = useState(false);

  useEffect(() => {
    if (!user) return;
    setForm({
      name: [user.firstName, user.lastName].filter(Boolean).join(" "),
      username: user.username ?? "",
      pronouns: user.pronouns ?? "",
      location: user.location ?? "",
      website: user.socialLinks?.website ?? "",
      twitter: user.socialLinks?.twitter ?? "",
      facebook: user.socialLinks?.facebook ?? "",
      instagram: user.socialLinks?.instagram ?? "",
      tagline: user.tagline ?? "",
      bio: user.bio ?? "",
      isProfilePublic: Boolean(user.isProfilePublic),
    });
    setInterests(Array.isArray(user.interests) ? user.interests : []);
  }, [user]);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const addInterest = () => {
    const text = interestInput.trim().toLowerCase();
    if (!text) return;
    const match = Object.entries(INTEREST_OPTIONS).find(
      ([value, label]) => value === text || label.toLowerCase() === text
    );
    if (!match) {
      toast.error("Pick one of: " + Object.values(INTEREST_OPTIONS).join(", "));
      return;
    }
    if (!interests.includes(match[0])) setInterests([...interests, match[0]]);
    setInterestInput("");
  };

  const avatar = getImageUrl(user?.avatar) || "/images/avatars/default-avatar.png";

  const onPhoto = async (file?: File) => {
    if (!file || !token) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      toast.error("Use a JPG, PNG or WebP image.");
      return;
    }
    if (file.size > MAX_AVATAR) {
      toast.error("Image must be under 2MB.");
      return;
    }
    setPhotoBusy(true);
    try {
      await api.profile.uploadAvatar(file.type, await toBase64(file), token);
      await queryClient.invalidateQueries({ queryKey: ["current-user"] });
      toast.success("Photo updated.");
    } catch (err) {
      const msg = (err as { response?: { data?: { message?: string } } }).response?.data?.message;
      toast.error(msg || "Could not upload your photo.");
    } finally {
      setPhotoBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const removePhoto = async () => {
    if (!user?.id || !user.avatar) return;
    setPhotoBusy(true);
    try {
      await api.users.update(String(user.id), { avatar: null }, token);
      await queryClient.invalidateQueries({ queryKey: ["current-user"] });
      toast.success("Photo removed.");
    } catch {
      toast.error("Could not remove your photo.");
    } finally {
      setPhotoBusy(false);
    }
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;
    setSaving(true);
    const [firstName, ...rest] = form.name.trim().split(/\s+/);
    try {
      await api.users.update(
        String(user.id),
        {
          firstName: firstName ?? "",
          lastName: rest.join(" "),
          username: form.username.replace(/^@/, "").trim(),
          pronouns: form.pronouns,
          location: form.location,
          tagline: form.tagline,
          bio: form.bio,
          interests,
          isProfilePublic: form.isProfilePublic,
          socialLinks: {
            website: form.website,
            twitter: form.twitter,
            facebook: form.facebook,
            instagram: form.instagram,
          },
        },
        token
      );
      await queryClient.invalidateQueries({ queryKey: ["current-user"] });
      toast.success("Profile updated.");
      router.push("/dashboard/profile");
    } catch (err) {
      const r = (err as { response?: { data?: { errors?: { message?: string }[]; message?: string } } }).response;
      toast.error(r?.data?.errors?.[0]?.message || r?.data?.message || "Could not save your profile.");
      setSaving(false);
    }
  };

  if (isLoading || !user) {
    return <p className="py-12 text-center font-inter text-sm italic text-white/40">Loading…</p>;
  }

  return (
    <form onSubmit={save} className="flex flex-col gap-8">
      <div>
        <Link
          href="/dashboard/profile"
          className="mb-6 inline-flex items-center gap-1.5 font-baskervville text-lg font-medium leading-[19.8px] text-white transition-opacity hover:opacity-80"
        >
          <ChevronLeft className="size-4" strokeWidth={2.5} /> Back
        </Link>
        <h1 className="font-baskervville text-[22px] font-semibold leading-[24.2px] text-white">
          Edit Profile
        </h1>
      </div>

      {/* Photo */}
      <div className="flex flex-wrap items-center gap-7">
        <div className="relative size-[130px] shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={avatar}
            alt="Your profile photo"
            className="size-full rounded-full border-[3px] border-black object-cover"
          />
          {photoBusy && (
            <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50">
              <Loader2 className="size-6 animate-spin text-white" />
            </span>
          )}
          <span className="absolute bottom-[6px] right-[10px] size-4 rounded-full bg-[#00BC7D] ring-2 ring-[#16100C]" />
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <p className="font-inter text-lg font-semibold text-white">Profile Photo</p>
            <p className="mt-1.5 font-inter text-[15.25px] text-white/80">
              JPG, PNG, or WebP · Max 2MB
            </p>
          </div>
          <div className="flex gap-2.5">
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={(e) => onPhoto(e.target.files?.[0])}
            />
            <button
              type="button"
              disabled={photoBusy}
              onClick={() => fileRef.current?.click()}
              className="inline-flex h-10 items-center gap-2 rounded-[7px] px-4 font-inter text-sm text-white outline outline-[0.5px] -outline-offset-[0.5px] outline-yellow-700/50 transition-opacity hover:opacity-80 disabled:opacity-50"
            >
              <Camera className="size-3.5" /> Upload Photo
            </button>
            <button
              type="button"
              disabled={photoBusy || !user.avatar}
              onClick={removePhoto}
              className="inline-flex h-10 items-center gap-2 rounded-[7px] px-4 font-inter text-sm text-white outline outline-[0.5px] -outline-offset-[0.5px] outline-yellow-700/50 transition-opacity hover:opacity-80 disabled:opacity-40"
            >
              <Trash2 className="size-3.5" /> Remove
            </button>
          </div>
        </div>
      </div>

      <h2 className="font-baskervville text-xl font-semibold leading-[22px] text-white">
        Personal Information
      </h2>

      <div className="grid gap-x-[21px] gap-y-[21px] md:grid-cols-2">
        <Field label="Name">
          <input className={inputClass} value={form.name} onChange={set("name")} />
        </Field>
        <Field label="Username">
          <input className={inputClass} value={form.username} onChange={set("username")} />
        </Field>
        <Field label="Role">
          <input className={inputClass} value={getRoleLabel(user.role)} disabled />
        </Field>
        <Field label="Pronouns">
          <input className={inputClass} value={form.pronouns} onChange={set("pronouns")} placeholder="e.g. she/her" />
        </Field>
        <Field label="Location">
          <input className={inputClass} value={form.location} onChange={set("location")} placeholder="City, Country" />
        </Field>
        <Field label="Email">
          <input className={inputClass} value={user.email ?? ""} disabled />
        </Field>
        <Field label="Website">
          <input className={inputClass} value={form.website} onChange={set("website")} placeholder="https://" />
        </Field>
        <Field label="Twitter">
          <input className={inputClass} value={form.twitter} onChange={set("twitter")} placeholder="@handle" />
        </Field>
        <Field label="Facebook">
          <input className={inputClass} value={form.facebook} onChange={set("facebook")} placeholder="https://facebook.com/…" />
        </Field>
        <Field label="Instagram">
          <input className={inputClass} value={form.instagram} onChange={set("instagram")} placeholder="@handle" />
        </Field>
        <Field label="Tagline" className="md:col-span-2">
          <input className={inputClass} value={form.tagline} onChange={set("tagline")} placeholder="One line shown on your profile" />
        </Field>
        <Field label="Bio" className="md:col-span-2">
          <textarea
            className={cn(inputClass, "h-[138px] resize-none py-4 leading-[25px]")}
            value={form.bio}
            onChange={set("bio")}
            placeholder="Tell us about yourself"
          />
        </Field>
      </div>

      {/* Interests */}
      <div className="flex flex-col gap-[13px]">
        <span className="font-inter text-base text-white">Interests</span>
        {interests.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {interests.map((i) => (
              <span
                key={i}
                className="inline-flex h-[26px] items-center gap-1.5 rounded-full bg-rose-100/5 pl-[11px] pr-2 font-inter text-xs text-white outline outline-1 -outline-offset-1 outline-yellow-700/15"
              >
                {INTEREST_OPTIONS[i] ?? i}
                <button
                  type="button"
                  aria-label={`Remove ${INTEREST_OPTIONS[i] ?? i}`}
                  onClick={() => setInterests(interests.filter((x) => x !== i))}
                  className="transition-opacity hover:opacity-70"
                >
                  <X className="size-3" />
                </button>
              </span>
            ))}
          </div>
        )}
        <div className="flex gap-3">
          <input
            list="interest-options"
            value={interestInput}
            onChange={(e) => setInterestInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addInterest();
              }
            }}
            placeholder="Add an interest and press Enter"
            className="h-[42px] min-w-0 flex-1 rounded-md bg-transparent px-3.5 font-inter text-sm text-white shadow-sm outline outline-1 -outline-offset-1 outline-yellow-700/15 placeholder:text-white/70 focus:outline-2 focus:outline-yellow-700/60"
          />
          <datalist id="interest-options">
            {Object.values(INTEREST_OPTIONS).map((l) => (
              <option key={l} value={l} />
            ))}
          </datalist>
          <button
            type="button"
            onClick={addInterest}
            className="h-[42px] w-20 rounded-md bg-rose-100/5 font-inter text-sm text-white transition-colors hover:bg-rose-100/10"
          >
            Add
          </button>
        </div>
      </div>

      <label className="flex cursor-pointer items-start gap-3 rounded-md p-3.5 outline outline-1 -outline-offset-1 outline-yellow-700/15">
        <input
          type="checkbox"
          checked={form.isProfilePublic}
          onChange={(e) => setForm((p) => ({ ...p, isProfilePublic: e.target.checked }))}
          className="mt-0.5 size-4 accent-orange-400"
        />
        <span>
          <span className="block font-inter text-sm font-medium text-white">Make my profile public</span>
          <span className="block font-inter text-xs text-white/60">
            Anyone with your link can see your name, photo, role, bio, interests, location and
            social links at /u/{form.username.replace(/^@/, "") || "your-username"}. Your email,
            library, saved items and collections stay private.
          </span>
        </span>
      </label>

      <div className="flex justify-end gap-[10px] pt-4">
        <button
          type="button"
          onClick={() => router.push("/dashboard/profile")}
          className="h-[47px] w-[216px] rounded-md font-inter text-lg text-white/80 outline outline-1 -outline-offset-1 outline-yellow-700 transition-colors hover:bg-white/5"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex h-[47px] w-[216px] items-center justify-center gap-2 rounded-md font-inter text-lg font-medium text-yellow-950 transition-opacity hover:opacity-90 disabled:opacity-60"
          style={{ background: "linear-gradient(42deg, #A16207 15%, #FB923C 81%)" }}
        >
          {saving && <Loader2 className="size-4 animate-spin" />}
          Save Changes
        </button>
      </div>
    </form>
  );
}
