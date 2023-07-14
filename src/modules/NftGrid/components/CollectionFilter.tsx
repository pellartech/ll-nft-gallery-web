interface CollectionFilterProps {
    isOpen: boolean
    toggleOpen: () => void
}

const CollectionFilter = ({ isOpen, toggleOpen }: CollectionFilterProps) => {
    return (
        <div
            className={`flex-none bg-dark-90 rounded-[10px]  transition-all duration-200 ${isOpen ? 'w-72 h-96' : 'h-[52px]'}`}
        >
            <div className="flex p-2 h-[52px] align-middle justify-between m-auto w-full">
                <button type="button" className="flex gap-1 align-middle justify-center" onClick={toggleOpen}>
                    <img className="m-auto" src="/images/icons/filter.svg" alt="" />
                    <div className="m-auto text-white text-sm">Filter</div>
                </button>
                {isOpen && <button type="button" className="text-sm text-grey-80">Clear all</button>}
            </div>
        </div>
    )
}

export default CollectionFilter