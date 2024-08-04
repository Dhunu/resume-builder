import useResume from "@/hooks/useResume";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";

export default function Summary() {
  const { summary, setSummary } = useResume();
  return (
    <div className="mb-10 flex justify-center gap-5">
      <h1 className="flex w-10 flex-col-reverse items-center justify-evenly rounded-lg border bg-neutral-50 p-1 text-base font-semibold uppercase leading-3">
        <div className="-rotate-90">S</div>
        <div className="-rotate-90">U</div>
        <div className="-rotate-90">M</div>
        <div className="-rotate-90">M</div>
        <div className="-rotate-90">A</div>
        <div className="-rotate-90">R</div>
        <div className="-rotate-90">Y</div>
      </h1>
      <div className="flex flex-1 flex-col gap-5">
        <div className="flex h-full w-full flex-col">
          <Label className="mb-1">Summary</Label>
          <Textarea
            value={summary}
            className="min-h-40 flex-1 resize-none"
            onChange={(e) => setSummary(e.target.value)}
            placeholder="I am a passionate and dedicated full stack web developer. I have recently graduated and I am eager to apply my skills and knowledge to real-world projects. I have experience with both front-end and back-end development, and I am proficient in technologies such as HTML, CSS, JavaScript, React, Node.js, and MongoDB. I am a quick learner and enjoy working in a collaborative team environment. I am excited about the opportunity to contribute to innovative and impactful projects as a full stack web developer."
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Character left:{" "}
            <span
              className={cn(
                "font-semibold",
                summary.length > 400 && "text-red-500"
              )}
            >
              {400 - summary.length}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
