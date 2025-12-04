export default function Starter({ starter, heading, flavour }: { starter: string, heading: string, flavour: string }) {
    return (
        <header className="flex flex-col gap-4 mb-20 text-center">
            <h3 className="text-secondary text-2xl">{starter}</h3>
            <h1 className="font-bold text-primary text-5xl">{heading}</h1>
            <h2 className="text-accent text-2xl">{flavour}</h2>
        </header>
    )
}
