// Importing NPM Dependencies
import React from "react";

const Attachment = (props) => {
    const { attachment = {}, wrapperClass = "" } = props;

    return (
        <div className={wrapperClass}>
            {attachment?.type === "video" ? (
                <video
                    className='att h-full w-full rounded-md bg-black'
                    controls
                >
                    <source src={attachment.url} type='video/mp4' />
                </video>
            ) : (
                attachment?.type === "image" && (
                    <img
                        className='att h-full w-full rounded-md'
                        src={attachment.url}
                        alt='Attachment'
                    />
                )
            )}
        </div>
    );
};

const Attachments = (props) => {
    const { postsData = [], isDetail = false } = props;

    /* Logic for filtering images and video and then rearranging video to 1st place */
    const videos = postsData.filter((obj) => obj.type === "video");
    const images = postsData.filter((obj) => obj.type === "image");
    const rearrangedData = [...videos, ...images];

    /**
     * GetAttachmentLayout
     *
     * @returns {JSX}
     */
    const getAttachmentLayout = () => {
        switch (rearrangedData.length) {
            case 0:
                return null;
            case 1:
                return (
                    <div>
                        <Attachment
                            attachment={rearrangedData[0]}
                            wrapperClass='h-[128px] w-[410px]'
                        />
                    </div>
                );
            case 2:
                return (
                    <div className={isDetail ? "" : "flex"}>
                        <Attachment
                            attachment={rearrangedData[0]}
                            wrapperClass={`h-[128px] ${
                                isDetail ? "w-[410px]" : "w-[200px]"
                            }`}
                        />
                        <Attachment
                            attachment={rearrangedData[1]}
                            wrapperClass={`h-[128px] ${
                                isDetail
                                    ? "w-[410px] mt-[8px"
                                    : "w-[200px] ml-[8px]"
                            }`}
                        />
                    </div>
                );
            case 3:
                return (
                    <div className={isDetail ? "" : "flex"}>
                        <Attachment
                            attachment={rearrangedData[0]}
                            wrapperClass={`h-[128px] ${
                                isDetail ? "w-[410px]" : "w-[200px]"
                            }`}
                        />
                        <div className={`others ${isDetail ? "" : "ml-[8px]"}`}>
                            <Attachment
                                attachment={rearrangedData[1]}
                                wrapperClass={`${
                                    isDetail
                                        ? "w-[410px] mt-[8px] h-[128px]"
                                        : "w-[200px] h-[60px]"
                                }`}
                            />
                            <Attachment
                                wrapperClass={`mt-[8px] ${
                                    isDetail
                                        ? "w-[410px] h-[128px]"
                                        : "w-[200px] h-[60px]"
                                }`}
                                attachment={rearrangedData[2]}
                            />
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return <div>{getAttachmentLayout()}</div>;
};

export default Attachments;
