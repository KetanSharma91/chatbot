import Image from 'next/image'

type searchProps = {
    question: string;
    setQuestion: React.Dispatch<React.SetStateAction<string>>;
    file: File | null;
    setFile: React.Dispatch<React.SetStateAction<File | null>>;
    onSubmitBtn: () => Promise<void>;
}

function SearchBar({ question, setQuestion, file, setFile, onSubmitBtn }: searchProps) {

    const onEnterBtn = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && (question !== "")) {
            e.preventDefault();
            onSubmitBtn();
        }
    }

    function getAfterSlash(str: string) {
        if (typeof str !== "string") return "";
        const index = str.lastIndexOf("/");
        return index !== -1 ? str.substring(index + 1) : str;
    }

    return (
        <div className='w-full border border-gray-600 rounded-4xl flex-row justify-between px-2 py-1 overflow-hidden bg-white'>
            <div className="flex justify-start">
                <div className={`${file ? "relative" : "hidden"} border border-gray-700 rounded-xl w-auto flex ml-0.5 mt-0.5`}>
                    <div className='p-1 text-left mt-2'>
                        <Image
                            src={'/file.png'}
                            alt='plus'
                            width={25}
                            height={25}
                            loading="eager"
                            priority
                        />
                    </div>
                    <div className='text-left p-1'>
                        <p className="text-sm">{file?.name}</p>
                        <p className="text-sm">{file?.type.includes("image") ? getAfterSlash(file.type).toUpperCase() : file?.type == "application/pdf" ? "PDF" : "Document"}</p>
                    </div>
                </div>
            </div>

            <div className='w-full flex'>
                <div className='flex w-full'>
                    <div className='m-2 mt-3 cursor-pointer group'>
                        <input type="file" onKeyDown={onEnterBtn} multiple onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            if (e.target.files && e.target.files.length > 0) {
                                setFile(e.target.files[0]); // ✅ store the File object
                            }
                        }} id="file-upload" className="hidden" />
                        <label htmlFor="file-upload" className='cursor-pointer'>
                            <Image
                                src={'/plus.png'}
                                alt='plus'
                                width={25}
                                height={25}
                                loading="eager"
                                priority
                            />
                        </label>
                        <span className="absolute -translate-x-1/2 mt-2 w-max bg-gray-800 text-white text-[12px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            Add files
                        </span>
                    </div>
                    <input type="text" placeholder='Ask anything' onKeyDown={onEnterBtn} value={question} onChange={(e) => setQuestion(e.target.value)} className='focus:border-none focus:outline-none text-black w-full placeholder-gray-400' />
                    {/* <textarea placeholder='Ask anything' value={question} onChange={(e) => setQuestion(e.target.value)} className='focus:border-none focus:outline-none w-full resize-none mt-3' /> */}
                </div>
                <button disabled={question === ""} type='button' onClick={onSubmitBtn} className='bg-black p-2 rounded-full my-2 mx-2 cursor-pointer'>
                    <Image
                        src={'/arrow.png'}
                        alt='arrow'
                        width={17}
                        height={17}
                        loading="eager"
                        priority
                    />
                </button>
            </div>
        </div>
    )
}

export default SearchBar