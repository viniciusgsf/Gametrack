const genreLabels: Record<string, string> = {
  Action: 'Ação',
  'action-adventure': 'Ação-Aventura',
  adventure: 'Aventura',
  casual: 'Casual',
  fighting: 'Luta',
  FPS: 'FPS',
  puzzle: 'Quebra-Cabeça',
  racing: 'Corrida',
  rpg: 'RPG',
  simulation: 'Simulação',
  'e-sports': 'Esportes',
  strategy: 'Estratégia',
  'survival-horror': 'Survival Horror'
}

const platformLabels: Record<string, string> = {
  pc: 'PC',
  ps5: 'PlayStation 5',
  xbox: 'Xbox',
  switch: 'Nintendo Switch',
  mobile: 'Mobile'
}

const statusLabels: Record<string, string> = {
  playing: 'Jogando',
  finished: 'Finalizado',
  'want-to-play': 'Quero Jogar',
  abandoned: 'Abandonado'
}

export {
  genreLabels,
  platformLabels,
  statusLabels
}