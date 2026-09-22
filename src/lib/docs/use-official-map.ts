import { useMemo } from "react";
import { MAP_SNAPSHOT, bakedDocsAsBlobs, compareDocs, type DocRow } from "./official-map";

type State = {
  docs: DocRow[];
  source: "baked" | "cache" | "live";
  loading: boolean;
  error: string | null;
  syncedAt: string | null;
};

export function refreshOfficialMap() {
  return Promise.resolve(bakedDocsAsBlobs(MAP_SNAPSHOT));
}

export function useOfficialMap(): State {
  const docs = useMemo(() => compareDocs(MAP_SNAPSHOT, bakedDocsAsBlobs(MAP_SNAPSHOT)), []);
  return {
    docs,
    source: "baked",
    loading: false,
    error: null,
    syncedAt: MAP_SNAPSHOT.capturedAt,
  };
}
