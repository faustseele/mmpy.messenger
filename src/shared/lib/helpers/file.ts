export async function urlToFile(
  url: string,
  filename?: string
): Promise<File> {
  const res = await fetch(url, { credentials: "include" });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);

  const blob = await res.blob();

  const disp = res.headers.get("content-disposition") ?? "";
  const nameFromHeader = /filename\*?=(?:UTF-8''|")?([^";]+)/i.exec(disp)?.[1];
  const nameFromUrl = url.split("/").pop() || "download";
  const name = filename ?? decodeURIComponent(nameFromHeader || nameFromUrl);

  return new File([blob], name, { type: blob.type });
}
