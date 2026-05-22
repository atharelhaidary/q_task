import { PageHeader, TaskCard} from ".."

export default  async function Tasks () {
    return(
        <div className="flex-col-container flex-grow gap-6">
            <PageHeader />
            <TaskCard/>
        </div>
    )
}