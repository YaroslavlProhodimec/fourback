import {db} from '../db/db'
import {BlogType} from "../types/blog/output";
import { v4 as uuidv4 } from 'uuid';
export class BlogRepository {

    static getAllBlogs() {
        return db.blogs
    }

    static addBlog(blog: BlogType) {
        const existingBlog = db.blogs.find((b) => b.id === blog.id);
        if (existingBlog) {
            return { ...existingBlog, id: existingBlog.id };
        }
        const newBlog = {...blog,id:generateUniqueId()}
        db.blogs.push(newBlog)
        return {...newBlog}
    }
    static deleteBlog(id: string) {
        let foundedIndexBlog: any = db.blogs.findIndex(b => b.id === id)
        db.blogs.splice(foundedIndexBlog, 1)
        if (foundedIndexBlog === -1) {
            return null
        }
        return foundedIndexBlog
    }
    static updateBlogs(id: string, blog: BlogType) {
        let foundedIndexBlog: any = db.blogs.findIndex(b => b.id === id)
        let foundedBlog: any = db.blogs.find(b => b.id === id)
        let { name, description, websiteUrl} = blog
        if (foundedIndexBlog === - 1) {
            return null
        }
        const updatedBlogs = {
            ...foundedBlog,
            name, description, websiteUrl
        }

        db.blogs.splice(foundedIndexBlog, 1, updatedBlogs)

        return updatedBlogs
    }

    static getBlogsById(id: string) {
        const blog = db.blogs.find(b => b.id === id)
        if (!blog) {
            return null
        }
        return blog
    }
}
export function generateUniqueId(): string {
    const fullUUID = uuidv4();
    return fullUUID.slice(0, 28);
}

