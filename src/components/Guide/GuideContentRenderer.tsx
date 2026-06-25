import { GuideContent } from "../../types/guide";

interface GuideContentRendererProps {
  content: GuideContent;
}

export default function GuideContentRenderer({ content }: GuideContentRendererProps) {
  if (typeof content === "string") {
    return (
      <p className="text-gray-200 text-sm font-normal leading-relaxed whitespace-pre-wrap">
        {content}
      </p>
    );
  }

  return (
    <div className="space-y-5 text-sm text-gray-200">
      {content.map((block, index) => {
        const key = `${block.type}-${index}`;

        if (block.type === "paragraph") {
          return (
            <section key={key} className="space-y-2">
              {block.title && (
                <h3 className="text-base font-semibold text-blue-300">{block.title}</h3>
              )}
              <p className="leading-relaxed text-gray-200">{block.text}</p>
            </section>
          );
        }

        if (block.type === "bulletList") {
          return (
            <section key={key} className="space-y-2">
              {block.title && (
                <h3 className="text-base font-semibold text-blue-300">{block.title}</h3>
              )}
              <ul className="space-y-2 pl-5 list-disc marker:text-blue-300">
                {block.items.map((item, itemIndex) => (
                  <li key={`${key}-${itemIndex}`} className="leading-relaxed text-gray-200">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          );
        }

        if (block.type === "compare") {
          return (
            <section key={key} className="space-y-3">
              {block.title && (
                <h3 className="text-base font-semibold text-blue-300">{block.title}</h3>
              )}
              <div className="overflow-x-auto rounded-xl border border-zinc-700/60">
                <table className="table w-full min-w-140 border-collapse text-left">
                  <thead className="bg-[#1d2433] text-xs uppercase tracking-wide text-gray-300">
                    <tr>
                      {block.columns.map((column) => (
                        <th key={column} className="px-4 py-3 font-semibold">
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-700/60 bg-[#171d2a]/70">
                    {block.rows.map((row, rowIndex) => (
                      <tr key={`${key}-${rowIndex}`}>
                        {row.map((cell, cellIndex) => (
                          <td
                            key={`${key}-${rowIndex}-${cellIndex}`}
                            className="px-4 py-3 align-top leading-relaxed text-gray-200"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          );
        }

        return (
          <aside
            key={key}
            className="rounded-xl border border-blue-500/30 bg-blue-500/15 px-4 py-3"
          >
            {block.title && (
              <h3 className="mb-1 text-sm font-semibold text-blue-400">{block.title}</h3>
            )}
            <p className="leading-relaxed text-blue-100">{block.text}</p>
          </aside>
        );
      })}
    </div>
  );
}
