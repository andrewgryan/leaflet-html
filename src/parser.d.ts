interface Issue {
  code: string;
  message: string;
}

type Status = 'clean' | 'abort';

interface Context<T> {
  status: Status;
  issues: Issue[];
  value: T;
}

type Parser<T, S> = (ctx: Context<T>) => Context<S>
