import { Float } from "~/ui/float"

export const CompetitionCard = () => {
    return (<Float action={
        <div className="flex gap-3 hover:shadow border dark:border-[#333]/50 p-3 rounded-2xl">
          <img src="/medium_square.png" alt="" className="aspect-square h-[150px] rounded-1.5" />
          <div>
            <p className="text-3xl font-bold">AWS Game Builder Challenge</p>
            <div className="flex items-center flex-wrap">
              <div className="flex p-1.4 py-0 rounded-full items-center gap-1 bg-blue w-max">
                <div className="i-proicons-clock"></div>
                14 days left
              </div>
              <div className="flex p-1.4 rounded-full items-center gap-1 w-max">
                <div className="i-proicons-globe"></div>
                Online
              </div>
            </div>
            <div className="flex items-center flex-wrap">
              <div className="flex p-1.4 py-0 rounded-full items-center gap-1 bg-[#3a4a] w-max">
                <div className="i-proicons-ribbon-star"></div>
                $12,000.00
              </div>
              <div className="flex p-1.4 rounded-full items-center gap-1 w-max">
                <div className="i-proicons-person-multiple"></div>
                120 Participants
              </div>
            </div>
          </div>
        </div>
      }>
        <div className="list-hover">
          <div className="flex items-center gap-1.5 p1.5">
            <div className="i-proicons-add-circle"></div>
            Join Competition
          </div>
          <div className="flex items-center gap-1.5 p1.5">
            <div className="i-proicons-eye"></div>
            View More...
          </div>
        </div>
      </Float>)
}