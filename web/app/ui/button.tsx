export const Button = ({ children }: { children: React.ReactNode }) => {
    return <button className="flex items-center  gap-1 p-1 px-3 bg-blue/90 rounded-full w-max hover:bg-slate/70">
        {children}
    </button>
} 