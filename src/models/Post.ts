import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export default class Post extends Model {
  static table = 'posts';

  @field('title')
  title: any;

  @field('body')
  body: any;

  @field('is_pinned')
  isPinned: any;
}
