import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AnyFieldApi, useForm } from "@tanstack/react-form";
import { X } from "lucide-react";
import { z } from "zod";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const userSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .regex(/^[A-Z]/, "Name must start with a capital letter"),
  surname: z.string().min(3, "Surname must be at least 3 characters"),
  interests: z
    .array(
      z.object({
        name: z.string().min(1, "Skill name is required"),
        score: z
          .number()
          .int()
          .min(0, "Score must be a positive number")
          .max(10, "Score can't be higher than 10"),
      })
    )
    .min(1, "At least one skill is required"),
});

type User = z.infer<typeof userSchema>;

export const UserCard = () => {
  const form = useForm({
    defaultValues: {
      name: "",
      surname: "",
      interests: [],
    } as User,
    validators: {
      onChange: userSchema,
    },
    onSubmit: ({ value }) => console.log(value),
  });

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Hello!</CardTitle>
        <CardDescription>Validating a form</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <form.Field
            name="name"
            children={(field) => (
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </div>
            )}
          />
          <form.Field
            name="surname"
            children={(field) => (
              <div>
                <Label htmlFor="surname">Surname</Label>
                <Input
                  id="surname"
                  type="text"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </div>
            )}
          />
          <form.Field
            name="interests"
            mode="array"
            children={(field) => (
              <div className="flex flex-col gap-2">
                <Label>Skills</Label>
                {field.state.value.map((_, index) => (
                  <div
                    key={index}
                    className="flex flex-col"
                  >
                    <div className="flex gap-2">
                      <form.Field
                        name={`interests[${index}].name`}
                        children={(subField) => (
                          <>
                            <Input
                              type="text"
                              value={subField.state.value}
                              onChange={(e) =>
                                subField.handleChange(e.target.value)
                              }
                              autoFocus
                            />
                          </>
                        )}
                      />
                      <form.Field
                        name={`interests[${index}].score`}
                        children={(subField) => (
                          <Input
                            type="number"
                            className="w-16"
                            min={0}
                            max={10}
                            value={subField.state.value}
                            onChange={(e) =>
                              subField.handleChange(e.target.valueAsNumber)
                            }
                          />
                        )}
                      />
                      <Button
                        variant={"destructive"}
                        onClick={() => field.removeValue(index)}
                      >
                        <X />
                      </Button>
                    </div>
                    <form.Subscribe
                      selector={(f) => f.fieldMeta[`interests[${index}].name`]}
                      children={() => <FieldInfo field={field} />}
                    />
                  </div>
                ))}
                <FieldInfo field={field} />
                <Button
                  type="button"
                  variant={"outline"}
                  onClick={() => field.pushValue({ name: "", score: 0 })}
                >
                  Add
                </Button>
              </div>
            )}
          />
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          onClick={() => form.reset()}
          variant="destructive"
        >
          Reset
        </Button>
        <Button onClick={form.handleSubmit}>Save</Button>
      </CardFooter>
    </Card>
  );
};

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em className="text-destructive text-sm mt-1">
          {field.state.meta.errors.map((err) => err.message).join(",")}
        </em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}
