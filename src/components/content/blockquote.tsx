import React from "react";

import { cn } from "~/lib/utils";

export const Blockquote = ({ children }: { children?: React.ReactNode }) => {
  // Split the children into lines
  const lines = React.Children.toArray(children).slice(1, -1);

  // The last line is assumed to be the author
  const quote = lines.slice(0, -1);
  const author = lines[lines.length - 1];

  return (
    <div className="my-6 flex max-w-2xl px-6">
      <div className="mr-4 w-1 bg-gray-200" />
      <div className="flex flex-col space-y-4 py-3">
        <blockquote className={cn(quote.length > 0 ? "font-serif text-2xl" : "text-xl")}>
          {quote.length > 0 ? quote : author}
        </blockquote>
        {quote.length > 0 && <p className="text-sm uppercase tracking-wide text-gray-400">{author}</p>}
      </div>
    </div>
  );
};
