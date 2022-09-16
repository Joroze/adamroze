import { getPlaiceholder } from 'plaiceholder';
import { faker } from '@faker-js/faker';

type MediaType = 'IMAGE' | 'VIDEO';

type CarouselAlbumEntity = {
  id: string;
  mediaUrl: string;
  mediaType: MediaType;
};

type InstagramPost = {
  id: string;
  mediaUrl: string;
  permalink: string;
  caption: string;
  mediaType: MediaType;
  thumbnailUrl: string;
  timestamp: string;
  children: CarouselAlbumEntity[];
  blurDataURL?: string;
};

export async function getInstagramPosts() {
  const isDevelopmentMode = process.env.NODE_ENV === 'development';

  const data: InstagramPost[] = isDevelopmentMode
    ? [...new Array(10)].map(() => ({
        caption: '',
        id: faker.datatype.uuid(),
        mediaType: 'IMAGE',
        mediaUrl: faker.image.cats(undefined, undefined, true),
      }))
    : await fetch(
        `https://feeds.behold.so/${process.env.BEHOLD_INSTAGRAM_API_ENDPOINT}`
      ).then((data) => data.json());

  const instagramPostsFlattened = data.reduce<InstagramPost[]>((acc, val) => {
    if (val.children) {
      acc.push(
        ...val.children
          .filter((child) => child.mediaType === 'IMAGE')
          .map((child) => ({
            ...val,
            ...child,
          }))
      );
    } else {
      acc.push(val);
    }
    return acc;
  }, []);

  const instagramPosts = isDevelopmentMode
    ? instagramPostsFlattened
    : await Promise.all(
        instagramPostsFlattened.map(async (post) => {
          try {
            const { base64 } = await getPlaiceholder(post.mediaUrl, {
              size: 10,
            });
            return {
              ...post,
              blurDataURL: base64,
            };
          } catch (error) {
            return post;
          }
        })
      );

  return instagramPosts;
}
