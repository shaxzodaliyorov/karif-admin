const getYoutubeId = (link: string) => {
  try {
    const urlObj = new URL(link);
    if (urlObj.hostname === 'youtu.be') {
      return urlObj.pathname.slice(1);
    }
    if (urlObj.searchParams.get('v')) {
      return urlObj.searchParams.get('v')!;
    }
    return null;
  } catch {
    return null;
  }
};

export const getYoutubeUrl = (link: string) => {
  const id = getYoutubeId(link);
  if (!id) {
    return null;
  }
  return `https://www.youtube.com/embed/${id}`;
};
