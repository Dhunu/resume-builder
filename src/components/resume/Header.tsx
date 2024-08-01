import useResume from "@/hooks/useResume";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export default function ResumeHeader() {
  const { header, setHeader } = useResume();

  return (
    <div className="mb-10 flex justify-center gap-5">
      <h1 className="flex w-10 flex-col-reverse items-center justify-evenly rounded-lg border bg-neutral-50 p-1 text-base font-semibold uppercase leading-3">
        <div className="-rotate-90">H</div>
        <div className="-rotate-90">E</div>
        <div className="-rotate-90">A</div>
        <div className="-rotate-90">D</div>
        <div className="-rotate-90">E</div>
        <div className="-rotate-90">R</div>
      </h1>
      <div className="flex flex-1 flex-col gap-5">
        <div className="w-full">
          <Label>Name</Label>
          <Input
            value={header.name}
            placeholder="Angel Saikia"
            onChange={(e) => setHeader({ ...header, name: e.target.value })}
          />
        </div>
        <div className="w-full">
          <Label>Title</Label>
          <Input
            value={header.title}
            placeholder="Full Stack Web Developer"
            onChange={(e) => setHeader({ ...header, title: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}
