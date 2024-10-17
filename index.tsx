import definePlugin from "@utils/types";
import { addChatBarButton, removeChatBarButton } from "@api/ChatButtons";
import { addButton, removeButton } from "@api/MessagePopover";
import { ChatBarButton } from "@api/ChatButtons";
import { classes } from "@utils/misc";
import { useEffect, useState, MessageActions, ChannelStore, SelectedChannelStore } from "@webpack/common";
import { classNameFactory } from "@api/Styles";

const cl = classNameFactory("vc-gary-");

// export function GaryIcon({ height = 24, width = 24, className }: { height?: number; width?: number; className?: string }) {
//     return (
//         <svg viewBox="0 0 24 24" height={height} width={width} className={classes(cl("icon"), className)}>
//             <path 
//                 fill="currentColor" 
//                 fillRule="evenodd" 
//                 d="M12.02 14.937c-.292 0-.59.045-.842.143a1.294 1.294 0 0 0-.408.245.916.916 0 0 0-.307.675c0 .325.173.552.307.674.133.123.285.198.408.246.253.098.55.142.842.142.29 0 .588-.044.84-.142.125-.048.276-.123.41-.246a.915.915 0 0 0 .306-.674.915.915 0 0 0-.307-.675 1.295 1.295 0 0 0-.408-.245 2.376 2.376 0 0 0-.841-.143Z" 
//                 clipRule="evenodd" 
//             />
//             <path 
//                 fill="currentColor" 
//                 d="M14.037 12.646c.164-.266.49-.584.98-.584.488 0 .814.318.979.584.172.278.254.615.254.948 0 .332-.082.67-.254.947-.165.266-.49.584-.98.584-.489 0-.815-.318-.98-.584a1.811 1.811 0 0 1-.254-.947c0-.333.082-.67.255-.948ZM9.016 12.063c-.488 0-.814.317-.98.583a1.811 1.811 0 0 0-.254.948c0 .332.082.67.255.947.165.266.49.584.98.584.488 0 .814-.318.98-.584.171-.278.253-.615.253-.947 0-.333-.082-.67-.254-.948-.165-.266-.49-.584-.98-.584Z" 
//             />
//             <path 
//                 fill="currentColor" 
//                 fillRule="evenodd" 
//                 d="M6.095 4.25c-.614 0-1.32.179-1.886.666-.587.505-.939 1.272-.939 2.271v1.878c.001.294.051.883.219 1.374.055.161.142.374.289.567a4.924 4.924 0 0 0-.48 1.704c-.051.467-.052.958-.044 1.411-.66.23-1.345.514-1.66.718a.75.75 0 0 0 .813 1.26c.116-.075.46-.233.912-.405.069.479.208.915.403 1.312a21.329 21.329 0 0 0-.516.333.75.75 0 1 0 .814 1.26l.131-.086c.131-.085.282-.184.446-.284.59.602 1.322 1.067 2.082 1.417 1.781.82 3.89 1.104 5.321 1.104 1.431 0 3.54-.285 5.321-1.104.76-.35 1.493-.815 2.082-1.417.164.1.315.199.446.284l.131.086a.75.75 0 0 0 .814-1.26l-.113-.074c-.11-.072-.247-.162-.403-.259.195-.396.335-.833.404-1.312.452.172.795.33.912.405a.75.75 0 0 0 .813-1.26c-.315-.204-1-.488-1.661-.718a11.31 11.31 0 0 0-.044-1.412 4.922 4.922 0 0 0-.48-1.703c.147-.193.234-.406.29-.567a4.79 4.79 0 0 0 .218-1.374V7.188c0-1-.352-1.766-.939-2.272-.565-.487-1.272-.666-1.886-.666-.408 0-.83.157-1.171.31a12.82 12.82 0 0 0-1.078.571l-.213.123-.002.001c-.264.153-.498.29-.707.397-.13.066-.23.112-.306.14a.696.696 0 0 1-.062.02 4.701 4.701 0 0 1-.648-.052l-.162-.02A11.885 11.885 0 0 0 12 5.656c-.772 0-1.21.041-1.556.084l-.162.02a4.7 4.7 0 0 1-.648.052.703.703 0 0 1-.062-.02 2.92 2.92 0 0 1-.306-.14 17.37 17.37 0 0 1-.707-.397l-.215-.124a12.82 12.82 0 0 0-1.077-.57c-.341-.154-.764-.311-1.172-.311Zm.067 13.364c.334.252.719.474 1.144.67 1.53.704 3.412.966 4.694.966s3.163-.262 4.694-.966c.425-.196.81-.418 1.144-.67a.75.75 0 0 1 .13-1.489c.327 0 .662.082.972.195.159-.332.256-.695.283-1.093a2.999 2.999 0 0 0-.61-.102.75.75 0 0 1 0-1.5c.195 0 .415.03.637.072 0-.276-.009-.547-.039-.825-.07-.645-.253-1.218-.684-1.727a3.39 3.39 0 0 0-.587-.54.75.75 0 1 1 .888-1.21c.12.088.232.178.338.27.044-.228.064-.467.064-.604V7.188c0-.626-.206-.953-.418-1.135-.232-.2-.562-.303-.907-.303-.07 0-.246.039-.554.178-.287.13-.608.308-.947.503a93.24 93.24 0 0 0-.193.112c-.268.155-.545.316-.79.442-.155.08-.316.156-.471.214a1.625 1.625 0 0 1-.556.114c-.372 0-.632-.034-.883-.067l-.137-.017A10.404 10.404 0 0 0 12 7.156c-.708 0-1.085.037-1.373.073l-.138.017c-.25.033-.511.066-.883.066-.213 0-.412-.06-.555-.113a4.362 4.362 0 0 1-.472-.214c-.245-.126-.522-.287-.79-.442l-.193-.112c-.339-.195-.66-.374-.947-.503-.308-.14-.484-.178-.554-.178-.344 0-.675.103-.907.303-.212.182-.418.51-.418 1.135V9.06c0 .137.02.376.064.604.107-.092.22-.182.338-.27a.75.75 0 0 1 .888 1.21c-.24.176-.433.357-.587.54-.43.51-.614 1.082-.684 1.727-.03.278-.04.55-.04.825.223-.043.443-.072.638-.072a.75.75 0 0 1 0 1.5c-.106 0-.312.03-.61.102.027.398.125.761.283 1.093a2.88 2.88 0 0 1 .972-.195.75.75 0 0 1 .13 1.489Z" 
//                 clipRule="evenodd" 
//             />
//         </svg>
//     );
// }



export function GaryIcon({ height = 30, width = 30, className }: { height?: number; width?: number; className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="none" viewBox="0 0 24 24" className={className}>
            <path 
                fill="currentColor" 
                fillRule="evenodd" 
                d="M11.75 6.406c-1.48 0-1.628.157-2.394.157C8.718 6.563 6.802 5 5.845 5c-.958 0-2.075.563-2.075 2.188v1.875c.002.492.18 2 .88 1.597-.827.978-.91 2.119-.899 3.223-.223.064-.45.137-.671.212-.684.234-1.41.532-1.737.744a.75.75 0 0 0 .814 1.26c.156-.101.721-.35 1.408-.585l.228-.075c.046.433.161.83.332 1.19l-.024.013c-.41.216-.79.465-1.032.623l-.113.074a.75.75 0 1 0 .814 1.26l.131-.086c.245-.16.559-.365.901-.545.08-.043.157-.081.231-.116C6.763 19.475 9.87 20 11.75 20s4.987-.525 6.717-2.148c.074.035.15.073.231.116.342.18.656.385.901.545l.131.086a.75.75 0 0 0 .814-1.26l-.113-.074a13.008 13.008 0 0 0-1.032-.623l-.024-.013c.171-.36.286-.757.332-1.19l.228.075c.687.235 1.252.484 1.409.585a.75.75 0 0 0 .813-1.26c-.327-.212-1.053-.51-1.736-.744-.221-.075-.449-.148-.672-.213.012-1.104-.072-2.244-.9-3.222.7.403.88-1.105.881-1.598V7.188C19.73 5.563 18.613 5 17.655 5c-.957 0-2.873 1.563-3.51 1.563-.767 0-.915-.157-2.395-.157Zm-.675 9.194c.202-.069.441-.1.675-.1.234 0 .473.031.676.1.1.034.22.088.328.174a.619.619 0 0 1 .246.476c0 .23-.139.39-.246.476-.107.086-.229.14-.328.174-.203.069-.442.1-.676.1-.234 0-.473-.031-.675-.1a1.078 1.078 0 0 1-.329-.174.619.619 0 0 1-.246-.476c0-.23.139-.39.246-.476.107-.086.23-.14.329-.174Zm2.845-3.1c.137-.228.406-.5.81-.5s.674.272.81.5c.142.239.21.527.21.813 0 .285-.068.573-.21.811-.136.229-.406.501-.81.501s-.673-.272-.81-.5a1.596 1.596 0 0 1-.21-.813c0-.285.068-.573.21-.811Zm-5.96 0c.137-.228.406-.5.81-.5s.674.272.81.5c.142.239.21.527.21.813 0 .285-.068.573-.21.811-.136.229-.406.501-.81.501s-.673-.272-.81-.5a1.596 1.596 0 0 1-.21-.813c0-.285.068-.573.21-.811Z" 
                clipRule="evenodd" 
            />
        </svg>
    );
}



export const GaryChatBarIcon: ChatBarButton = ({ isMainChat }) => {
    const handleClick = () => {
        const currentChannelId = SelectedChannelStore.getChannelId();
        if (currentChannelId) {
            const message = GetGary();
            MessageActions.sendMessage(currentChannelId, { content: message });
            console.log('Gary message sent.');
        } else {
            console.error('No current channel found');
        }
    };

    if (!isMainChat) return null;

    return (
        <ChatBarButton
            tooltip="Click for Gary"
            onClick={handleClick}
            buttonProps={{ "aria-label": "Gary Button" }}
        >
            <GaryIcon className={cl("chat-button")} />
        </ChatBarButton>
    );
};

export default definePlugin({
    name: "RandomGary",
    description: "Adds a button to send a random Gary picture!",
    authors: [{ name: "Zach Orange", id: 683550738198036516n }],
    start() {
        addChatBarButton("vc-gary", GaryChatBarIcon);
    },
    stop() {
        removeChatBarButton("vc-gary");
    }
});

export function GetGary() {
    const urlBase = 'https://cdn.garybot.dev/gary';
    const randomNumber = Math.floor(Math.random() * 532) + 1;
    return `${urlBase}${randomNumber}.jpg`;
}
