interface BlobConfig {
  color: string;
  size: string;
  position: string;
  animation: string;
}

interface OrganicBlobsProps {
  blobs?: BlobConfig[];
}

const defaultBlobs: BlobConfig[] = [
  {
    color: "bg-[#1B4332]",
    size: "w-[300px] h-[300px] md:w-[400px] md:h-[400px]",
    position: "top-20 -right-20",
    animation: "animate-drift",
  },
  {
    color: "bg-[rgba(201,168,76,0.08)]",
    size: "w-[250px] h-[250px] md:w-[300px] md:h-[300px]",
    position: "bottom-20 -left-20",
    animation: "animate-drift-slow",
  },
  {
    color: "bg-[#0D3321]",
    size: "w-[200px] h-[200px] md:w-[250px] md:h-[250px]",
    position: "top-1/2 right-1/4",
    animation: "animate-drift",
  },
];

export function OrganicBlobs({ blobs = defaultBlobs }: OrganicBlobsProps) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {blobs.map((blob, i) => (
        <div
          key={i}
          className={`absolute rounded-full blur-3xl opacity-60 ${blob.color} ${blob.size} ${blob.position} ${blob.animation}`}
        />
      ))}
    </div>
  );
}
