import { start, stop } from '@lib/mongoLib'
import {
  createCategory,
  deleteCategory,
  editCategory,
  getCategories,
  getCategory
} from '@services/categoryServices'
import { generateCategory } from '@mocks/categoryMocks'
import { UserInputError } from 'apollo-server-errors'
import { CreateCategory } from '@interfaces/categoryInterfaces'

const CATEGORY = generateCategory()

beforeAll(() => {
  start()
})

afterAll(() => {
  stop()
})

describe('Category Service', () => {
  it('should create a category', async () => {
    const categoryToCreate = {
      title: CATEGORY.title,
      slug: CATEGORY.slug
    }
    const category = await createCategory(categoryToCreate)
    CATEGORY.id = category.id
    expect(category.title).toMatch(CATEGORY.title)
    expect(category.slug).toMatch(CATEGORY.slug)
  })

  it('should throw duplicated category Error', async () => {
    const categoryToCreate = {
      title: CATEGORY.title,
      slug: CATEGORY.slug
    }
    await expect(createCategory(categoryToCreate)).rejects.toThrow(
      UserInputError
    )
    await expect(createCategory(categoryToCreate)).rejects.toThrow(
      / is already in use/
    )
  })

  it('should throw category validation error', async () => {
    const categoryToCreate = {} as CreateCategory
    await expect(createCategory(categoryToCreate)).rejects.toThrow(Error)
  })

  it('should get previously created category', async () => {
    const query = {
      _id: CATEGORY.id
    }
    const category = await getCategory(query)
    expect(category.title).toMatch(CATEGORY.title)
  })

  it('should get categories', async () => {
    const query = {
      _id: [CATEGORY.id]
    }
    const categories = await getCategories(query)
    expect(categories).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: CATEGORY.title
        })
      ])
    )
  })

  it("should throw a Category doesn't exist", async () => {
    const query = { _id: '444444444444444444444444' }
    await expect(getCategory(query)).rejects.toThrow(Error)
    await expect(getCategory(query)).rejects.toThrow("Category doesn't exist")
  })

  it('should edit a category', async () => {
    const query = {
      _id: CATEGORY.id
    }
    const data = {
      seoTitle: CATEGORY.seoTitle,
      seoDescription: CATEGORY.seoDescription,
      excerpt: CATEGORY.excerpt
    }
    const editedCategory = await editCategory(query, data)
    expect(editedCategory.seoTitle).toMatch(CATEGORY.seoTitle as string)
    expect(editedCategory.seoDescription).toMatch(
      CATEGORY.seoDescription as string
    )
    expect(editedCategory.excerpt).toMatch(CATEGORY.excerpt)
  })

  it("should throw a category can't be edited", async () => {
    const query = { _id: '444444444444444444444444' }
    const data = {
      seoTitle: CATEGORY.seoTitle,
      seoDescription: CATEGORY.seoDescription,
      excerpt: CATEGORY.excerpt
    }
    await expect(editCategory(query, data)).rejects.toThrow(Error)
    await expect(editCategory(query, data)).rejects.toThrow(
      "Category doesn't exist or can't be edited"
    )
  })

  it('should delete category', async () => {
    const query = {
      _id: CATEGORY.id
    }
    const deletedCategory = await deleteCategory(query)
    expect(deletedCategory.id).toMatch(CATEGORY.id)
  })
  it("should throw category can't be deleted", async () => {
    const query = { _id: '444444444444444444444444' }
    await expect(deleteCategory(query)).rejects.toThrow(Error)
    await expect(deleteCategory(query)).rejects.toThrow(
      "Category doesn't exist"
    )
  })
})
