export interface ID {
  id: string
}

export interface User extends ID {
  exp: number,
  name: string,
  title?: string,
  last_logged_in: number,
  login_streak: number
}

export interface Quest extends ID {
  rank: number,
  difficulty: number,
  title: string,
  description: string,
  until_date: number
}

export interface Title extends ID {
  name: string,
  description: string,
  check_user_owns: (user: User) => boolean
}

const exp_to_next_rank = [100, 140, 260, 420, 660, 900, 1200, 1800];
const rank_title = ['F', 'E', 'D', 'C', 'B', 'A', 'S', 'SS', 'SSS+'];

export function getRankTitle(user: User) {
  return rank_title[getRank(user).rank];
}

export function getRank(user: User) {
  let cur = user.exp;
  for (let idx = 0; idx < exp_to_next_rank.length; idx++) {
    const item = exp_to_next_rank[idx];
    cur -= item;
    if(cur < 0) {
      return {rank: idx, current: (item + cur) / item, remained: -cur};
    }
  }
  return {rank: exp_to_next_rank.length, current: 1, remained: 0};
}
