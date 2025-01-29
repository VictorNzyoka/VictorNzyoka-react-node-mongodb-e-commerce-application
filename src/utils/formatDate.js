export const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('em-us',{
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}