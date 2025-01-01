export const FilterSideBar = () => {

    return (<div className="p-5">
        <h2 className='font-bold text-xl'>Filters</h2>
        {filterGroup.map((group) => (
            <div key={group.name} className="mb-4">
                <h3 className="text-lg mb-2 font-600">{group.name}</h3>
                {group.filters.map((filter, i) => (
                    <>{group.filters.length > 5 ? (<>
                        {i < 5 ? <div key={filter.value} className="ml-3 mb-1">
                        <label>
                            <input type="checkbox" value={filter.value} />
                            {` ${filter.name}`}
                        </label>
                    </div> : <></>}
                    </>) : (<><div key={filter.value} className="ml-3 mb-1">
                        <label>
                            <input type="checkbox" value={filter.value} />
                            {` ${filter.name}`}
                        </label>
                    </div></>)}</>
                ))}
            </div>
        ))}
    </div>)
}

type Filter = {
    name: string;
    value: string;
}

type Group = {
    name: string;
    filters: Filter[];
}

const filterGroup: Group[] = [
    {
        name: "Location",
        filters: [
            { name: "Online", value: "online" },
            { name: "In-person", value: "in-person" }
        ]
    },
    {
        name: "Status",
        filters: [
            { name: "Upcoming", value: "upcoming" },
            { name: "Open", value: "open" },
            { name: "Ended", value: "ended" }
        ]
    },
    {
        name: "Length",
        filters: [
            { name: "1–6 days", value: "1-6-days" },
            { name: "1–4 weeks", value: "1-4-weeks" },
            { name: "1+ month", value: "1+-month" }
        ]
    },
    {
        name: "Interest tags",
        filters: [
            { name: "Beginner Friendly", value: "beginner-friendly" },
            { name: "Social Good", value: "social-good" },
            { name: "Machine Learning/AI", value: "machine-learning-ai" },
            { name: "Open Ended", value: "open-ended" },
            { name: "Education", value: "education" },
            { name: "Web", value: "web" },
            { name: "Blockchain", value: "blockchain" },
            { name: "Design", value: "design" },
            { name: "Productivity", value: "productivity" },
            { name: "Health", value: "health" },
            { name: "Communication", value: "communication" },
            { name: "AR/VR", value: "ar-vr" },
            { name: "Gaming", value: "gaming" },
            { name: "Low/No Code", value: "low-no-code" },
            { name: "COVID-19", value: "covid-19" },
            { name: "Fintech", value: "fintech" },
            { name: "IoT", value: "iot" },
            { name: "Mobile", value: "mobile" },
            { name: "DevOps", value: "devops" },
            { name: "Cybersecurity", value: "cybersecurity" },
            { name: "Lifehacks", value: "lifehacks" },
            { name: "Databases", value: "databases" },
            { name: "Enterprise", value: "enterprise" },
            { name: "E-commerce/Retail", value: "ecommerce-retail" },
            { name: "Voice skills", value: "voice-skills" },
            { name: "Music/Art", value: "music-art" },
            { name: "Robotic Process Automation", value: "robotic-process-automation" },
            { name: "Quantum", value: "quantum" }
        ]
    },
    {
        name: "Open to",
        filters: [
            { name: "Public", value: "public" },
            { name: "Invite only", value: "invite-only" }
        ]
    }
]