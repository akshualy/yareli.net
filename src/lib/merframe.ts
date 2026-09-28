export const MERFRAME_REPOSITORY = "https://github.com/akshualy/Merframe";

const LATEST_JSON = `${MERFRAME_REPOSITORY}/releases/latest/download/latest.json`;

export const PACKAGES = {
  appimage: { label: "AppImage", platform: "Linux" },
  deb: { label: "deb", platform: "Debian, Ubuntu" },
  rpm: { label: "rpm", platform: "Fedora, openSUSE" },
  arch: { label: "pkg.tar.zst", platform: "Arch" },
  msi: { label: "msi", platform: "Windows" },
  nsis: { label: "exe", platform: "Windows" },
} as const;

export type PackageKey = keyof typeof PACKAGES;

export interface Release {
  version: string;
  date: string;
  downloads: Record<PackageKey, string>;
}

interface LatestJson {
  version: string;
  pub_date: string;
  platforms: Record<string, { url: string }>;
}

export async function latestRelease(): Promise<Release | null> {
  try {
    const response = await fetch(LATEST_JSON, { next: { revalidate: 900 } });
    if (!response.ok) {
      return null;
    }
    const latest: LatestJson = await response.json();
    const platform = (name: string) => latest.platforms[name].url;
    return {
      version: latest.version,
      date: latest.pub_date,
      downloads: {
        appimage: platform("linux-x86_64-appimage"),
        deb: platform("linux-x86_64-deb"),
        rpm: platform("linux-x86_64-rpm"),
        arch: `${MERFRAME_REPOSITORY}/releases/download/v${latest.version}/merframe-${latest.version}-1-x86_64.pkg.tar.zst`,
        msi: platform("windows-x86_64-msi"),
        nsis: platform("windows-x86_64-nsis"),
      },
    };
  } catch {
    return null;
  }
}

export function packageForPlatform(userAgent: string): PackageKey {
  return userAgent.includes("Windows") ? "msi" : "appimage";
}
