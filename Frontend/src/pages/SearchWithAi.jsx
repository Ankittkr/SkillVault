import React, { useEffect, useRef, useState } from "react";
import { IoArrowBack, IoSend, IoMic } from "react-icons/io5";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";

import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../utils/axios";
import start from "../assets/start.mp3"


export const SearchWithAi = () => {

    const navigate = useNavigate();
    const startSound = new Audio(start)
    const [input, setInput] = useState("");
    const [chats, setChats] = useState([]);
    const [listening, setListening] = useState(false);
    const [loadingText, setLoadingText] = useState("");
    const [aiLoading,setAiLoading] = useState(false)
    const loadingMessages = [
        "Understanding your learning goal...",
        "Analyzing your requirements...",
        "Searching matching courses...",
        "Finding the best recommendations...",
        "Checking course relevance...",
        "Almost done...",
        "Finalizing recommendations..."
    ];
    const chatEndRef = useRef(null);
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({
            behavior: "smooth"
        });

    }, [chats]);
    const handleSend = async () => {

        if (!input.trim() || aiLoading) return;

        setAiLoading(true)

        const userMessage = input;


        setChats(prev => [
            ...prev,
            {
                type: "user",
                text: userMessage
            },
            {
                type: "ai",
                loading: true
            }
        ]);


        setInput("");


        let index = 0;


        const interval = setInterval(() => {

            setLoadingText(
                loadingMessages[index]
            );


            index++;


            if (index >= loadingMessages.length) {
                index = 0;
            }


        }, 2000);



        try {


            const res = await api.post(
                "/search/searchwithai",
                {
                    input: userMessage
                }
            );

            console.log(res.data.data);
            
            clearInterval(interval);


            setChats(prev =>
                prev.filter(chat => !chat.loading)
            );


            setChats(prev => [
                ...prev,
                {
                    type: "ai",
                    text:
                        "I found the best courses based on your learning goal.",
                    recommendations:res.data.data
                }
            ])



        } catch (error) {


            if(error.status === 429){
                toast.error("AI service limit reached. Please try later.")
            }
            
            clearInterval(interval);


            setChats(prev =>
                prev.filter(chat => !chat.loading)
            );


            setChats(prev => [
                ...prev,
                {
                    type: "ai",
                    text: "Unable to find courses."
                }
            ])

        }
        finally{
            setAiLoading(false)
        }


    }

    const speak = (message) => {
        let utternce = new SpeechSynthesisUtterance(message)
        window.speechSynthesis.speak(utternce)
    }
    const startVoice = () => {

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert("Voice search is not supported in this browser");
            return;
        }

        const recognition = new SpeechRecognition();
        if (!recognition) {
            toast.error("Speech Recognition is not supported")
            return
        }
        startSound.play()
        recognition.lang = "en-US";
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.start();

        setListening(true);

        recognition.onresult = (event) => {
            const text = event.results[0][0].transcript.trim();
            setInput(text);
        }
        recognition.onend = () => {
            setListening(false);
        }
    }


    return (

        <div
            className=" min-h-screen bg-gray-100 flex flex-col relative"
        >


            {/* HEADER */}

            <div
                className=" h-16 bg-white shadow flex items-center px-5 sticky top-0 z-50"
            >


                <button
                    onClick={() => navigate(-1)}
                    className=" w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:scale-105 transition "
                >

                    <IoArrowBack size={22} />

                </button>



                <div
                    className=" mx-auto flex items-center gap-3 font-bold text-xl "
                >


                    <div
                        className=" w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white "
                    >

                        ✦

                    </div>


                    Skill Vault AI


                </div>



            </div>

            {/* CHAT AREA */}

            <div
                className=" flex-1 max-w-4xl w-full mx-auto px-5 overflow-y-auto flex flex-col pb-32
 "
            >


                {
                    chats.length === 0 ? (

                        /* EMPTY STATE LIKE GEMINI */
                        <div
                            className=" flex-1 flex flex-col items-center justify-center text-center "
                        >


                            <div
                                className=" w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white text-5xl shadow-xl "
                            >
                                ✦
                            </div>


                            <h1
                                className=" text-4xl font-bold mt-8 text-black "
                            >
                                How can I help you learn?
                            </h1>


                            <p
                                className=" text-gray-500 mt-3 "
                            >
                                Ask AI to find the perfect course for your goals
                            </p>





                            {/* CENTER SEARCH */}

                            <div
                                className=" mt-10 w-full flex flex-wrap gap-3 bg-white p-3 rounded-2xl shadow-lg border "
                            >


                                <input

                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter")
                                            handleSend()
                                    }}
                                    placeholder="Describe what you want to learn..."
                                    className=" w-[80%] flex-1 px-5 py-4 outline-none text-gray-700 "

                                />

                                {/* VOICE BUTTON */}

                                <button
                                    onClick={startVoice}
                                    className={` w-[10%] h-14 rounded-xl flex items-center justify-center transition 
                                        ${listening
                                            ?
                                            "bg-red-500 text-white animate-pulse"
                                            :
                                            "bg-gray-100 text-black"
                                        }`}

                                >
                                    <IoMic size={24} />
                                </button>

                                {/* SEND BUTTON */}
                                {input && <button
                                    onClick={handleSend}
                                    className=" w-[10%] h-14 rounded-xl text-black md:bg-black md:text-white flex items-center justify-center hover:scale-105 transition "
                                >
                                    <IoSend size={22} />
                                </button>}

                            </div>
                        </div>
                    )
                        :
                        /* CHAT MODE */

                        (
                            <div className="py-8 space-y-5">

                                {
                                    chats.map((chat, index) => (
                                        <>
                                            <div
                                                key={index}
                                                className={`flex ${chat.type === "user"
                                                    ?
                                                    "justify-end"
                                                    :
                                                    "justify-start"
                                                    }`}
                                            >

                                                <div
                                                    className={` max-w-xl px-5 py-3 rounded-2xl text-sm
                                                        ${chat.type === "user"
                                                            ?
                                                            "bg-black text-white"
                                                            :
                                                            "bg-white shadow text-gray-700"
                                                        }`}
                                                >

                                                    {
                                                        chat.loading ?

                                                            <div className="flex items-center gap-3">

                                                                <div className=" w-3 h-3 rounded-full bg-black animate-pulse "></div>
                                                                <p className=" text-gray-500 text-sm animate-pulse ">
                                                                    {loadingText}
                                                                </p>
                                                            </div>
                                                            :
                                                            chat.text

                                                    }

                                                </div>

                                            </div>

                                            {
                                                chat?.recommendations?.length > 0 && (

                                                    <div className="mt-8">

                                                        <h2
                                                            className=" text-2xl font-bold text-black mb-5"
                                                        >
                                                            Recommended Courses For You
                                                        </h2>


                                                        <Swiper

                                                            modules={[Autoplay, Pagination]}

                                                            spaceBetween={20}

                                                            slidesPerView={1}

                                                            autoplay={{
                                                                delay: 3000,
                                                                disableOnInteraction: false
                                                            }}

                                                            pagination={{
                                                                clickable: true
                                                            }}

                                                            breakpoints={{

                                                                640: {
                                                                    slidesPerView: 2
                                                                },

                                                                1024: {
                                                                    slidesPerView: 3
                                                                }

                                                            }}
                                                            className="pb-14"

                                                        >


                                                            {
                                                                chat?.recommendations?.map((course) => (

                                                                    <SwiperSlide
                                                                        key={course._id}>

                                                                        <Card
                                                                            category={course.category}
                                                                            price={course.price}

                                                                            title={course.title}

                                                                            level={course.level}

                                                                            thumbnail={course.thumbnail}

                                                                            id={course._id}

                                                                            reviews={course.reviews}

                                                                            className="mb-8"
                                                                        />

                                                                    </SwiperSlide>

                                                                ))
                                                            }


                                                        </Swiper>


                                                    </div>

                                                )
                                            }
                                        </>


                                    ))


                                }


                                <div ref={chatEndRef}></div>





                                {/* FIXED SEARCH BAR */}

                                {
                                    chats.length > 0 &&
                                    <div
                                        className=" fixed bottom-0 left-0 right-0 bg-gray-100/90 backdrop-blur py-4 z-50"
                                    >

                                        <div
                                            className=" max-w-4xl mx-auto px-5"
                                        >

                                            <div
                                                className=" bg-white border shadow-lg rounded-2xl p-3 flex gap-3 "
                                            >


                                                <input
                                                    value={input}
                                                    onChange={(e) => setInput(e.target.value)}

                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter" && !aiLoading)
                                                            handleSend()
                                                    }}
                                                    placeholder="Ask anything about courses..."
                                                    className=" flex-1 px-4 outline-none "
                                                />


                                                <button

                                                    onClick={startVoice}

                                                    className={` w-12 h-12 rounded-xl flex items-center justify-center
                                                        ${listening
                                                            ?
                                                            "bg-red-500 text-white animate-pulse"
                                                            :
                                                            "bg-gray-100"
                                                        }`}
                                                >
                                                    <IoMic size={22} />

                                                </button>
                                                <button
                                                    disabled={aiLoading}
                                                    onClick={handleSend}

                                                    className=" w-12 h-12 rounded-xl md:bg-black text-black md:text-white flex items-center justify-center"
                                                >
                                                    <IoSend size={20} />

                                                </button>


                                            </div>

                                        </div>

                                    </div>

                                }

                            </div>
                        )
                }
            </div>
        </div>

    )

}