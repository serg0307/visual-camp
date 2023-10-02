export enum FilterType {
  AND = 'AND',
  OR = 'OR',
}
export enum FilterOperator {
  EQUAL = '%3D',
  MORE = '>',
  LESS = '<',
  NOT_EQUAL = '%3C%3E',
}
export enum AuthTokenError {
  NO_TOKEN = 'No token provided.',
  INVALID_TOKEN = 'Token is invalid.'
}
export enum EntityBundles {
  SCENE = 'node/scene',
  GAME = 'node/game',
  CHARACTER = 'node/character',
  ACTIONS = 'comment/scene_actions',
  CHAT = 'comment/chat_messages',
  ACHIEVEMENTS = 'taxonomy_term/achievements',
  GENRES = 'taxonomy_term/genres',
  USER = 'user/user',
  FILE = 'file/file'
}
export enum JsonApiHttpMethods {
  GET='get',
  POST='post',
  PATCH='patch',
  DELETE='delete'
}
