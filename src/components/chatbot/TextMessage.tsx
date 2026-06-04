import { TextPart } from "@tanstack/ai";

type PropsType = {
  part: TextPart;
};

const TextMessage = ({ part }: PropsType) => {
  return <div className="whitespace-pre-wrap leading-7">{part.content}</div>;
};

export default TextMessage;
