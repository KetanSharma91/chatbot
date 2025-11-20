"use client";
import SearchBar from "@/components/SearchBar";
import { deleteAll, getConversations, getResponse, markdownToHtml, storeResponse } from "@/utils";
import { useState, useEffect } from "react";
import Image from 'next/image'
import { ConversationItem, memory } from "@/utils/vector";

export default function Home() {

  const [center, setCenter] = useState(true);
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [conversations, setConversations] = useState<ConversationItem[]>([]);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const getRepsonses = async () => {
    // await deleteAll(); // delete all history;

    const response = await getConversations();
    setConversations(response);
  }

  const onSubmitBtn: () => Promise<void> = async () => {

    const newQuestion = question;
    const newId = conversations.length + 1;

    setConversations((prev) => [
      ...prev,
      { id: newId, question: newQuestion, answer: "", embedding: [] },
    ]);

    setLoadingId(newId);
    // setQuestion("");

    setLoading(true);
    setQuestion("");
    const response = await getResponse(question, file);
    setLoading(false);

    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === newId ? { ...conv, answer: response.answer, embedding: response.embedding } : conv
      )
    );

    const newConveration = {
      id: newId,
      question: newQuestion,
      answer: response.answer,
      embedding: response.embedding
    };

    await storeResponse(newConveration);
  }

  useEffect(() => {
    getRepsonses();
  }, [])

  useEffect(() => {
    if ((conversations && conversations.length)) {
      setCenter(false);
    } else {
      setCenter(true);
    }

  }, [conversations]);

  return (
    <section className={`w-full sm:container text-center justify-center justify-items-center items-center mx-auto sm:max-w-[600px] overflow-hidden overflow-y-auto flex flex-col mt-4 ${center ? "" : ""}`}>

      <nav className="bg-white fixed top-0 left-0 w-full pb-3 border-b border-gray-600 text-left sm:border-none sm:bg-transparent">
        <h2 className="text-3xl font-medium mt-5 ml-5">ChatBot</h2>
      </nav>

      <div className="w-full flex-1 sm:max-w-[600px] text-left mt-13 pb-32 overflow-y-auto">
        {conversations && conversations.length > 0 && conversations.map((item) => {
          // const html: any = markdownToHtml(item.answer);
          // const typed: any = useTypingEffect(html, 40);

          return (
            <div className="mt-5" key={item.id}>
              <div className="flex justify-end">
                <div className="inline-block max-w-[80%] ml-22 sm:ml-45 pl-4 px-2 py-3 rounded-2xl mx-3 bg-gray-100 text-black dark:bg-gray-800 dark:text-white">
                  <p className="text-sm">{item.question}</p>
                </div>
              </div>
              <div className="mt-5 mx-3">
                {loadingId === item.id ?
                  loading ? (
                    <Image
                      src="/loading.gif"
                      alt="loading"
                      width={30}
                      height={30}
                      // loading="eager"
                      // priority
                      className="dark:invert-100"
                    />
                  ) : (
                    <>
                      {/* <p>{markdownToHtml(item.answer)}</p> */}
                      <div
                        className="markdown"
                        dangerouslySetInnerHTML={{ __html: markdownToHtml(item.answer) }}
                      />
                      {/* {typed.length < html.replace(/<[^>]+>/g, "").length ? (
                        <p className="markdown whitespace-pre-wrap">{typed}</p>
                      ) : (
                        // 🔵 Final stage (full HTML rendered)
                        <div
                          className="markdown"
                          dangerouslySetInnerHTML={{ __html: html }}
                        />
                      )} */}
                      <div className="mt-3 cursor-pointer" onClick={() => navigator.clipboard.writeText(item.answer)}>
                        <Image
                          src="/copy.png"
                          alt="copy"
                          width={17}
                          height={17}
                          loading="eager"
                          priority
                          className="dark:invert-100"
                        />
                      </div>
                    </>
                  ) :
                  <>
                    <div
                      className="markdown"
                      dangerouslySetInnerHTML={{ __html: markdownToHtml(item.answer) }}
                    />
                    <div className="mt-3 cursor-pointer" onClick={() => navigator.clipboard.writeText(item.answer)}>
                      <Image
                        src="/copy.png"
                        alt="copy"
                        width={17}
                        height={17}
                        loading="eager"
                        priority
                        className="dark:invert-100"
                      />
                    </div>
                  </>
                }
              </div>
            </div>
          );
        })}
        {/* <div className="mt-5">
          {question1 &&
            <div className="flex justify-end">
              <div className="inline-block max-w-[80%] ml-22 sm:ml-45 pl-4 px-2 py-3 rounded-2xl mx-3 bg-gray-100 text-black dark:bg-gray-800 dark:text-white">
                <p className="text-sm">{question1}</p>
              </div>
            </div>
          }
          <div className="mt-5 mx-3">
            {!loading ?
              <p>{answer}</p>
              : <Image
                src={'/loading.gif'}
                alt='arrow'
                width={30}
                height={30}
                className="dark:invert-100"
              />
            }
          </div>
        </div> */}
      </div>

      <div className={`w-full sm:max-w-[600px] sm:min-w-[600px] mx-12 sm:mx-0 ${center ? "mt-28" : "fixed bottom-4"}`}>
        <h5 className={`text-2xl mb-6 ${center ? "" : "hidden"}`}>What can I help with?</h5>
        <SearchBar question={question} setQuestion={setQuestion} file={file} setFile={setFile} onSubmitBtn={onSubmitBtn} />
      </div>
    </section>
  );
}