export function getCollectionName(path: string): string {
    // لو عندك mapping معين
    const collectionMap: any = {
        'userId': 'User',
        'lessons': 'Lesson',
        'classesData': 'Class',
        'classData': 'Class',
        'subjectsData': 'Subject',
        'teachersData' : 'Teacher'
    };
    
    return collectionMap[path] || `${path}s`; // fallback
}