import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {
  FieldValues,
  FieldPath,
  FieldPathValue,
  UseFormSetValue,
  UseFormClearErrors,
} from "react-hook-form";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const onChangeValidate = <
  TFieldValues extends FieldValues,
  K extends FieldPath<TFieldValues>
>(
  key: K,
  value: FieldPathValue<TFieldValues, K>,
  setValue: UseFormSetValue<TFieldValues>,
  clearErrors: UseFormClearErrors<TFieldValues>
): void => {
  setValue(key, value);
  if (value) {
    clearErrors(key);
  }
};

class QueryBuilder {
  private query: string;

  constructor(url: string) {
    this.query = `${url}?`;
  }

  set(key: string, value: string | number | boolean | undefined): this {
    if (value === undefined || value === null || value === "") return this;
    this.query += `${encodeURIComponent(key)}=${encodeURIComponent(
      String(value)
    )}&`;
    return this;
  }

  build(): string {
    return this.query.slice(0, -1);
  }
}

export default QueryBuilder;
