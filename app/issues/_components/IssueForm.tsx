"use client";
import { TextField, Button, Callout, Text, Theme } from "@radix-ui/themes";
import React, { useState } from "react";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueSchema } from "@/app/validationSchema";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { Issue } from "@prisma/client";
import SimpleMDE from "react-simplemde-editor";
interface props {
  issue?: Issue;
}

type IssueFormData = z.infer<typeof issueSchema>;
const IssueForm = ({ issue }: { issue?: Issue }) => {
  const [error, setErr] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });
  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className=" mt-3  space-y-5"
        onSubmit={handleSubmit(async (data) => {
          try {
            setIsSubmiting(true);
            if (issue) await axios.patch(`/api/issues/${issue.id}`, data);
            else await axios.post("/api/issues", data);
            router.push("/issues/push");
            router.refresh();
          } catch (error) {
            setIsSubmiting(false);
            setErr("an unexpected error occured");
          }
        })}
      >
        <TextField.Root
          defaultValue={issue?.title}
          placeholder="Title..."
          {...register("title")}
        ></TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Theme className=" rounded-md" appearance="light">
          <Controller
            defaultValue={issue?.description}
            name="description"
            control={control}
            render={({ field }) => (
              <SimpleMDE placeholder="Description…" {...field} />
            )}
          />
        </Theme>
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmiting}>
          {issue ? "Update Issue" : "Submit new Issue"}{" "}
          {isSubmiting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
