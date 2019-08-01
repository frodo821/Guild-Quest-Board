import { Title, getRank } from "../firebase/datatype";

export const titles: Title[] = [
  {
    id: "user.rank.e",
    description: "Eランクになった。",
    name: "かけだし冒険者",
    check_user_owns: user => getRank(user).rank >= 1
  }
];