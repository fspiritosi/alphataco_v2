export default function HeaderModule({ title, description }: { title: string; description: string }) {
    return (
        <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
        <p className="mt-2 text-muted-foreground">{description}</p>
      </div>
)}