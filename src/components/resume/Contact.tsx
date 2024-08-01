import { Label } from "../ui/label";
import { Input } from "../ui/input";
import useResume from "@/hooks/useResume";

export default function Contact() {
  const { contact, setContact } = useResume();
  return (
    <div className="flex justify-center gap-5">
      <h1 className="flex w-10 flex-col-reverse items-center justify-evenly rounded-lg border bg-neutral-50 p-1 text-base font-semibold uppercase leading-3">
        <div className="-rotate-90">C</div>
        <div className="-rotate-90">O</div>
        <div className="-rotate-90">N</div>
        <div className="-rotate-90">T</div>
        <div className="-rotate-90">A</div>
        <div className="-rotate-90">C</div>
        <div className="-rotate-90">T</div>
      </h1>
      <div className="flex flex-1 flex-col gap-5">
        <div className="w-full">
          <Label>Email</Label>
          <Input
            value={contact.email}
            placeholder="developer@angelsaikia.com"
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
          />
        </div>
        <div className="w-full">
          <Label>Address</Label>
          <Input
            value={contact.location}
            placeholder="Nagaon, Assam, India"
            onChange={(e) =>
              setContact({ ...contact, location: e.target.value })
            }
          />
        </div>

        <div className="flex gap-5">
          <div className="w-full">
            <Label>Phone</Label>
            <Input
              value={contact.phone}
              placeholder="+91-8011158661"
              onChange={(e) =>
                setContact({ ...contact, phone: e.target.value })
              }
            />
          </div>
          <div className="w-full">
            <Label>LinkedIn</Label>
            <Input
              value={contact.linkedIn}
              placeholder="782003"
              onChange={(e) => {
                setContact({ ...contact, linkedIn: e.target.value });
              }}
            />
          </div>
        </div>
        <div className="w-full">
          <Label>Website</Label>
          <Input
            value={contact.website}
            placeholder="https://angelsaikia.com"
            onChange={(e) => {
              setContact({ ...contact, website: e.target.value });
            }}
          />
        </div>
      </div>
    </div>
  );
}
