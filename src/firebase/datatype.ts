export interface ID {
  id: string
}

export interface User {
  exp: number,
  name: string,
  title: string,
  last_logged_in: number,
  login_streak: number
}

export interface Quest {
  rank: number,
  difficulty: number,
  title: string,
  description: string
}

export interface Title extends ID {
  name: string,
  description: string,
  check_user_owns: (user: User) => boolean
}

const exp_to_next_rank = [100, 140, 260, 420, 660, 900, 1200, 1800];
const rank_title = ['F', 'E', 'D', 'C', 'B', 'A', 'S', 'SS', 'SSS+'];

export function getRankTitle(user: User) {
  return rank_title[getRank(user)];
}

export function getRank(user: User) {
  let cur = user.exp;
  for (let idx = 0; idx < exp_to_next_rank.length; idx++) {
    const item = exp_to_next_rank[idx];
    cur -= item;
    if(cur < 0) {
      return idx;
    }
  }
  return exp_to_next_rank.length;
}
