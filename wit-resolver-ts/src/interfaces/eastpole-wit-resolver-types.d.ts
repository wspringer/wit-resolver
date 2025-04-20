/** @module Interface eastpole:wit-resolver/types@0.1.0 **/

export class Resolver {
  constructor()
  resolve(): string;
  register(path: string, wit: string): void;
}
