import React from 'react';
import Post from './Post';

function PopularPosts() {
  const popPosts = [
    {
      id: 1,
      content: 'Ааагх! Треба скоріше все здати! А я замість цього тут сиджу...',
      author: { full_name: 'Влад Кравченко', username: 'vld_krav' },
      created_at: '2024-12-27T19:54:27Z',
      likes: 23,
      is_liked: false,
      views: 109,
    },
    {
      id: 2,
      content: 'Не думав, що платформа дійсно появиться.',
      author: { full_name: 'Федір Петренко', username: 'fed_petr' },
      created_at: '2024-09-29T16:34:32Z',
      likes: 17,
      is_liked: false,
      views: 53,
    },
    {
      id: 3,
      content: 'Так приємно поділитись переживаннями!',
      author: { full_name: 'Софія Ткаченко', username: 'sofya_tkach' },
      created_at: '2024-10-01T14:23:56Z',
      likes: 9,
      is_liked: true,
      views: 31,
    },
  ];
  return (
    <section className="mb-5">
      <h3 className="mb-4">Популярні пости</h3>
      <div className="col-lg-12">
        {popPosts.map((post) => (
          <div key={post.id} className="col mb-2">
            <Post post={post} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default PopularPosts;
