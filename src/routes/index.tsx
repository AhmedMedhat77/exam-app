import { Button } from "@/shared/ui/button";
import { Field, FieldLabel } from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen p-20">
      <form className="flex max-w-sm flex-col gap-8">
        <div className="grid grid-cols-2 gap-2">
          <Field>
            <FieldLabel htmlFor="firstname">First name</FieldLabel>
            <Input placeholder="First name" id="firstname" />
          </Field>
          <Field>
            <FieldLabel htmlFor="lastname" aria-disabled>
              Last name
            </FieldLabel>
            <Input placeholder="Last name" id="lastname" disabled />
          </Field>
          <Field>
            <FieldLabel htmlFor="invalid">Invalid</FieldLabel>
            <Input placeholder="Invalid" id="invalid" aria-invalid={true} />
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input placeholder="*****" id="password" type="password" />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button className="w-full" variant="default">
            Submit
          </Button>
          <Button className="w-full" variant="secondary">
            Submit
          </Button>
          <Button className="w-full" variant="destructive">
            Delete
          </Button>
          <Button className="w-full" variant="outline">
            Outline
          </Button>
          <Button className="w-full" variant="ghost">
            Ghost
          </Button>
          <Button className="w-full" variant="link">
            Link
          </Button>
        </div>
      </form>
    </div>
  );
}
