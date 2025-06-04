/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Category CRUD operations
 */

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     security:
 *       - tokenHeader: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Category]
 *     security:
 *       - tokenHeader: []
 *     responses:
 *       200:
 *         description: A list of categories
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get category by ID
 *     tags: [Category]
 *     security:
 *       - tokenHeader: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "123"
 *     responses:
 *       200:
 *         description: Found the category
 *       404:
 *         description: Category not found
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Update category by ID
 *     tags: [Category]
 *     security:
 *       - tokenHeader: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "123"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Category"
 *     responses:
 *       200:
 *         description: Updated successfully
 *       404:
 *         description: Category not found
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete category by ID
 *     tags: [Category]
 *     security:
 *       - tokenHeader: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "123"
 *     responses:
 *       204:
 *         description: Deleted successfully
 *       404:
 *         description: Category not found
 *       401:
 *         description: Unauthorized
 */
