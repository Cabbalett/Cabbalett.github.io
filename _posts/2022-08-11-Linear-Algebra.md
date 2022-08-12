---
title: "[Linear Algebra]"
excerpt: "Recap of concepts in linear algebra"
date:   2022-08-11 10:17:22 +0900
tags: ['Machine Learning']
classes: wide
toc: true
---

## Basic Concepts

We can represent some linear equations in a more compact way.

$$
\begin{aligned}
4 x_{1}-5 x_{2} &=-13 \\
-2 x_{1}+3 x_{2} &=9
\end{aligned}
$$

The equation can be represented as below.

$$
A x=b\\
A=\left[\begin{array}{cc}
4 & -5 \\
-2 & 3
\end{array}\right], \quad b=\left[\begin{array}{c}
-13 \\
9
\end{array}\right]
$$

### Matrix Multiplication

The product of $A \in \mathbb{R}^{m \times n}$ and $B \in \mathbb{R}^{n \times p}$ is $C=A B \in \mathbb{R}^{m \times p}$, where $C_{i j}=\sum_{k=1}^{n} A_{i k} B_{k j}$.

The number of columns in A must equal the number of rows in B.

## Vector-Vector Product

### Inner(dot) Product

$$
x^{T} y \in \mathbb{R}=\left[\begin{array}{llll}
x_{1} & x_{2} & \cdots & x_{n}
\end{array}\right]\left[\begin{array}{c}
y_{1} \\
y_{2} \\
\vdots \\
y_{n}
\end{array}\right]=\sum_{i=1}^{n} x_{i} y_{i}
$$

note that $x^{T} y=y^{T} x$.

### Outer Product

$$
x y^{T} \in \mathbb{R}^{m \times n}=\left[\begin{array}{c}
x_{1} \\
x_{2} \\
\vdots \\
x_{m}
\end{array}\right]\left[\begin{array}{llll}
y_{1} & y_{2} & \cdots & y_{n}
\end{array}\right]=\left[\begin{array}{cccc}
x_{1} y_{1} & x_{1} y_{2} & \cdots & x_{1} y_{n} \\
x_{2} y_{1} & x_{2} y_{2} & \cdots & x_{2} y_{n} \\
\vdots & \vdots & \ddots & \vdots \\
x_{m} y_{1} & x_{m} y_{2} & \cdots & x_{m} y_{n}
\end{array}\right]
$$

## Matrix-Vector Product

Given a matrix $A \in \mathbb{R}^{m \times n}$ and a vector $x \in \mathbb{R}^{n}$, we can express $y=A x \in \mathbb{R}^{m}$ as

$$
y=A x=\left[\begin{array}{ccc}
- & a_{1}^{T} & - \\
- & a_{2}^{T}& - \\
& \vdots \\
-& a_{m}^{T} & -
\end{array}\right] x=\left[\begin{array}{c}
a_{1}^{T} x \\
a_{2}^{T} x \\
\vdots \\
a_{m}^{T} x
\end{array}\right]
$$

or

$$
y=A x=\left[\begin{array}{cccc}
\mid & \mid & & \mid \\
a_{1} & a_{2} & \cdots & a_{n} \\
\mid & \mid & & \mid
\end{array}\right]\left[\begin{array}{c}
x_{1} \\
x_{2} \\
\vdots \\
x_{n}
\end{array}\right]=\left[\begin{array}{l}
a_{1}
\end{array}\right] x_{1}+\left[\begin{array}{l}
a_{2}
\end{array}\right] x_{2}+\ldots+\left[\begin{array}{l}
a_{n}
\end{array}\right] x_{n}
$$

you can interpret this as a linear combination of the columns of $A$.

## Matrix-Matrix Product

$$
C=A B=\left[\begin{array}{ccc}
- & a_{1}^{T} & - \\
- & a_{2}^{T} & - \\
\vdots \\
- & a_{m}^{T} & -
\end{array}\right]\left[\begin{array}{cccc}
\mid & \mid & & \mid \\
b_{1} & b_{2} & \cdots & b_{p} \\
\mid & \mid & & \mid
\end{array}\right]=\left[\begin{array}{cccc}
a_{1}^{T} b_{1} & a_{1}^{T} b_{2} & \cdots & a_{1}^{T} b_{p} \\
a_{2}^{T} b_{1} & a_{2}^{T} b_{2} & \cdots & a_{2}^{T} b_{p} \\
\vdots & \vdots & \ddots & \vdots \\
a_{m}^{T} b_{1} & a_{m}^{T} b_{2} & \cdots & a_{m}^{T} b_{p}
\end{array}\right]
$$

- Associative: $(A B) C=A(B C)$
- Distributive: $A(B+C)=A B+A C$
- Not Commutative: $A B \neq B A$

## Operations and Properties

### Transpose

- $\left(A^{T}\right)^{T}=A$
- $(A B)^{T}=B^{T} A^{T}$
- $(A+B)^{T}=A^{T}+B^{T}$

### Symmetric Matrices

A square matrix $A \in \mathbb{R}^{n \times n}$ is:

- symmetric: $A=A^{T}$
- anti-symmetric: $A=-A^{T}$

- $A+A^{T}$: symmetric
- $A-A^{T}$: anti-symmetric

$$
A=\frac{1}{2}\left(A+A^{T}\right)+\frac{1}{2}\left(A-A^{T}\right)
$$

From the property above, we can always represent any square matrix as a sum of a symmetric matrix and an anti-symmetric matrix.

### Trace

The trace of a square matrix is a sum of diagonal elements in the matrix.

$$
\operatorname{tr} A=\sum_{i=1}^{n} A_{i i}
$$

- $\operatorname{tr} A=\operatorname{tr} A^{T}$
- $\operatorname{tr}(A+B)=\operatorname{tr} A+\operatorname{tr} B$
- $\operatorname{tr}(t A)=t \operatorname{tr} A$
- $\operatorname{tr} A B=\operatorname{tr} B A$
- $\operatorname{tr} A B C=\operatorname{tr} B C A=\operatorname{tr} C A B$

### Norms

norm is any function $f: \mathbb{R}^{n} \rightarrow \mathbb{R}$ that satisfies 4 properties.

1. Non-negativity: For all $x \in \mathbb{R}^{n}, f(x) \geq 0$
2. Definiteness: $f(x)=0$ if and only if $x=0$
3. Homogeneity: For all $x \in \mathbb{R}^{n}, t \in \mathbb{R}, f(t x)=\mid t\mid f(x)$
4. Triangle Inequality: For all $x, y \in \mathbb{R}^{n}, f(x+y) \leq f(x)+f(y)$

#### Examples

$\ell_{2}$ norm:

$$
\|x\|_{2}=\sqrt{\sum_{i=1}^{n} x_{i}^{2}}
$$

$\ell_{1}$ norm:

$$
\|x\|_{1}=\sum_{i=1}^{n}\left|x_{i}\right|
$$

$\ell_{\infty}$ norm:

$$
\|x\|_{\infty}=\max _{i}\left|x_{i}\right|
$$

$\ell_{p}$ norm:

$$
\|x\|_{p}=\left(\sum_{i=1}^{n}\left|x_{i}\right|^{p}\right)^{1 / p}
$$

### Linear Independence and Rank

A set of vectors $\left(x_{1}, x_{2}, \ldots x_{n}\right) \subset \mathbb{R}^{m}$ is linearly independent if no vector can be represented as a linear combination of the remaining vectors.

The vectors are linearly dependent if 

$$
x_{n}=\sum_{i=1}^{n-1} \alpha_{i} x_{i}
$$

rank of a matrix is the size of the largest subset of columns of A that makes a linearly independent set. There are both column and row ranks.

It is proven that for any matrix, the column rank and the row rank is the same.

- For $A \in \mathbb{R}^{m \times n}, \operatorname{rank}(A) \leq \min (m, n)$
  - If $\operatorname{rank}(A)=\min (m, n)$, the $A$ is said to be a full rank.
- For $A \in \mathbb{R}^{m \times n}, B \in \mathbb{R}^{n \times p}, \operatorname{rank}(A B) \leq \min (\operatorname{rank}(A), \operatorname{rank}(B))$
- For $A, B \in \mathbb{R}^{m \times n}, \operatorname{rank}(A+B) \leq \operatorname{rank}(A)+\operatorname{rank}(B)$

### Inverse

The inverse of a square matrix $A$ is a unique matrix that satisfies

$$
A^{-1} A=I=A A^{-1}
$$

$A$ is **invertible** or **non-singular** if $A^{-1}$ exists and **non-invertible** or **singular** otherwise.

$A$ must be **full rank** to be invertible.

- $\left(A^{-1}\right)^{-1}=A$
- $(A B)^{-1}=B^{-1} A^{-1}$
- $\left(A^{-1}\right)^{T}=\left(A^{T}\right)^{-1}$

### Orthogonal

Two vectors $x, y \in \mathbb{R}^{n}$ are orthogonal if $x^{T} y=0$. A vector is normalized if $\|x\|_{2}=1$. A square matrix is orthogonal if all its columns are orthogonal to each other and are normalized. These columns can be referred as an orthonormal.

$$
U^{T} U=I=U U^{T}
$$

The inverse okf an orthogonal matrix is its transpose.

### Range and Nullspace

The **span** of a set of vectors is the set of all vectors that can be expressed as a linear combination of the given set of vectors.

$$
\operatorname{span}\left(\left\{x_{1}, \ldots x_{n}\right\}\right)=\left\{v: v=\sum_{i=1}^{n} \alpha_{i} x_{i}, \quad \alpha_{i} \in \mathbb{R}\right\}
$$

If $\left(x_{1}, \ldots, x_{n}\right)$ is a set of $n$ linearly independent vectors, where $x_{i} \in \mathbb{R}^{n}$, then $\operatorname{span}\left((x_{1}, \ldots x_{n})\right)=\mathbb{R}^{n}$.

The **projection** of a vector $y \in \mathbb{R}^{m}$ onto $\operatorname{span}\left((x_{1}, \ldots x_{n})\right)$ is a vector $v \in \operatorname{span}\left((x_{1}, \ldots x_{n})\right)$ such that $v$ is as close as possible to $y$ based on the Euclidean norm.

$$
\operatorname{Proj}\left(y ;\left\{x_{1}, \ldots x_{n}\right\}\right)=\operatorname{argmin}_{v \in \operatorname{span}\left(\left\{x_{1}, \ldots, x_{n}\right\}\right)}\|y-v\|_{2}
$$

The **range** of a matrix $A \in \mathbb{R}^{m \times n}$ is the span of columns of A.

$$
\mathcal{R}(A)=\left\{v \in \mathbb{R}^{m}: v=A x, x \in \mathbb{R}^{n}\right\}
$$

Assuming that $A$ is full rank and $n<m$, the projection of vector $y \in \mathbb{R}^{m}$ onto range of $A$ is

$$
\operatorname{Proj}(y ; A)=\operatorname{argmin}_{v \in \mathcal{R}(A)}\|v-y\|_{2}=A\left(A^{T} A\right)^{-1} A^{T} y
$$

The **nullspace** of a matrix $A \in \mathbb{R}^{m \times n}$ is the set of all vectors that equal 0 when multiplied by $A$

$$
\mathcal{N}(A)=\left\{x \in \mathbb{R}^{n}: A x=0\right\}
$$

There are some properties related to this

$$
\left\{w: w=u+v, u \in \mathcal{R}\left(A^{T}\right), v \in \mathcal{N}(A)\right\}=\mathbb{R}^{n} \\
\mathcal{R}\left(A^{T}\right) \cap \mathcal{N}(A)=\{0\}
$$

Which means that $\mathcal{R}\left(A^{T}\right)$ and $\mathcal{N}(A)$ are disjoint subsets when aggregated, spans the entire space of $\mathbb{R}^{n}$.

### Determinant

Determinant is the representation of how much the space is squeezed, expanded, rotated.

It is hard to get this intuition from the equation.

$$
\begin{aligned}
&\left|\left[a_{11}\right]\right|=a_{11}\\
&\left|\left[\begin{array}{ll}
a_{11} & a_{12} \\
a_{21} & a_{22}
\end{array}\right]\right|=a_{11} a_{22}-a_{12} a_{21}\\
&\left|\left[\begin{array}{lll}
a_{11} & a_{12} & a_{13} \\
a_{21} & a_{22} & a_{23} \\
a_{31} & a_{32} & a_{33}
\end{array}\right]\right|=\begin{array}{r}
a_{11} a_{22} a_{33}+a_{12} a_{23} a_{31}+a_{13} a_{21} a_{32} \\
-a_{11} a_{23} a_{32}-a_{12} a_{21} a_{33}-a_{13} a_{22} a_{31}
\end{array}
\end{aligned}
$$

- For $A\in\mathbb{R}^{n\times n},\mid A\mid=\mid A^{T}\mid$
- For $A, B \in \mathbb{R}^{n \times n},\mid A B\mid=\mid A\mid\mid B\mid$
- For $A \in \mathbb{R}^{n \times n}$ and $A$ is non-singular, $\mid A^{-1}\mid=1/\mid A\mid$
- For $A \in \mathbb{R}^{n \times n},\mid A\mid =0$ if and only if $A$ is singular(or non-invertible)
  - If $A$ is singular, then it does not have full rank, making its columns linearly dependent. The set $S$ corresponds to a flat sheet within the $n$-dimensional space, and has zero volume, making the determinant 0.


### Quadratic Forms and Positive Semidefinite Matrices

Given a square matrix $A \in \mathbb{R}^{n \times n}$ and a vector $x \in \mathbb{R}^{n}$, the scalar value $x^{T} A x$ is called a quadratic form.

$$
x^{T} A x=\sum_{i=1}^{n} x_{i}(A x)_{i}=\sum_{i=1}^{n} x_{i}\left(\sum_{j=1}^{n} A_{i j} x_{j}\right)=\sum_{i=1}^{n} \sum_{j=1}^{n} A_{i j} x_{i} x_{j}\\
x^{T} A x=\left(x^{T} A x\right)^{T}=x^{T} A^{T} x=x^{T}\left(\frac{1}{2} A+\frac{1}{2} A^{T}\right) x
$$

Therefore, we can say that only the symmetric part of $A$ contributes to the quadratic form. We can assume that the matrices appearing in a quadratic form are symmetric.

- A symmetric matrix $A \in \mathbb{S}^{n}$ is **positive definite** if for all non-zero vectors $x \in \mathbb{R}^{n}, x^{T} A x>0$.
- A symmetric matrix $A \in \mathbb{S}^{n}$ is **positive semidefinite** if for all vectors $x \in \mathbb{R}^{n}, x^{T} A x>0$
- A symmetric matrix $A \in \mathbb{S}^{n}$ is **negative definite**, if for all non-zero $x \in \mathbb{R}^{n}, x^{T} A x>0$
- A symmetric matrix $A \in \mathbb{S}^{n}$ is **negative semidefinite**, if for all **$x \in \mathbb{R}^{n}, x^{T} A x>0$
- A symmetric matrix $A \in \mathbb{S}^{n}$ is **indefinite**, if it's neither positive semidefinite nor negative semidefinite.
- A positive definite and negative definite matrices are always full rank(or invertible)

### Eigenvalues and Eigenvectors

Given a square matrix $A \in \mathbb{R}^{n \times n}$, we say that $\lambda \in \mathbb{C}$ is an **eigenvalue** of $A$ and $x \in \mathbb{C}^{n}$ is the corresponding **eigenvector** if

$$
A x=\lambda x, \quad x \neq 0
$$

One eigenvector has the same direction, but can have different sizes. We normally choose the ones that are normalized to have length 1.

$$
(\lambda I-A) x=0, \quad x \neq 0
$$

For the equation above to have a non-zero solution, $(\lambda I-A)$ must have a non-empty nullspace. Which means that the columns are linearly dependent, not full rank, singular, and therefore the determinant must be 0.

$$
|(\lambda I-A)|=0
$$

We can solve this to first find the eigenvalues, then for each eigenvalue, we can solve $\left(\lambda_{i} I-A\right) x=0$ to get the eigenvectors.

- $\operatorname{tr} A=\sum_{i=1}^{n} \lambda_{i}$
- $\mid A\mid=\prod_{i=1}^{n} \lambda_{i}$
- $rank(A)$ is equal to the number of non-zero eigenvalues of $A$.
- If $A$ is non-singular then $1 / \lambda_{i}$ is an eigenvalue of $A^{-1}$ with associated eigenvector $x_i$. $A^{-1} x_{i}=\left(1 / \lambda_{i}\right) x_{i}$
- The eigenvalues of a diagonal matrix $D=\operatorname{diag}\left(d_{1}, \ldots d_{n}\right)$ are just the diagonal entries $d_{1}, \ldots d_{n}$.

We can express $A$ as below, if the eigenvectors are linearly independent. We call this **diagonalizable**.

$$
A=X \Lambda X^{-1}
$$

### Eigenvalues and Eigenvectors of Symmetric Matrices

- All eigenvalues of $A$ are real
- eigenvectors of $A$ are orthonormal

$$
A=U \Lambda U^{T}\\
x^{T} A x=x^{T} U \Lambda U^{T} x=y^{T} \Lambda y=\sum_{i=1}^{n} \lambda_{i} y_{i}^{2}
$$

#### Example

Let's say we want have a maximization problem.

$$
\max _{x \in \mathbb{R}^{n}} x^{T} A x \quad \text { subject to }\|x\|_{2}^{2}=1
$$

The optimal $x$ for this problem is $x_1$, which is the eigenvector corresponding to $\lambda_1$ when $\lambda_{1} \geq \lambda_{2} \geq \ldots \geq \lambda_{n}$.

## Matrix Calculus

### Gradient

Suppose that $f: \mathbb{R}^{m \times n} \rightarrow \mathbb{R}$ is a function that takes as input a matrix $A$ size of $m \times n$ and returns a real value. Then the gradient of f is defined as

$$
\nabla_{A} f(A) \in \mathbb{R}^{m \times n}=\left[\begin{array}{cccc}
\frac{\partial f(A)}{\partial A_{11}} & \frac{\partial f(A)}{\partial A_{12}} & \cdots & \frac{\partial f(A)}{\partial A_{11}} \\
\frac{\partial f(A)}{\partial A_{21}} & \frac{\partial f(A)}{\partial A_{22}} & \cdots & \frac{\partial f(A)}{\partial A_{2 n}} \\
\vdots & \vdots & \ddots & \vdots \\
\frac{\partial f(A)}{\partial A_{m 1}} & \frac{\partial f(A)}{\partial A_{m 2}} & \cdots & \frac{\partial f(A)}{\partial A_{m n}}
\end{array}\right]\\
\left(\nabla_{A} f(A)\right)_{i j}=\frac{\partial f(A)}{\partial A_{i j}}
$$

### Hessian

Suppose a function $f: \mathbb{R}^{n} \rightarrow \mathbb{R}$. Then the hessian matrix with respect to $x$, is the $n\times n$ matrix of partial derivatives.

$$
\nabla_{x}^{2} f(x) \in \mathbb{R}^{n \times n}=\left[\begin{array}{cccc}
\frac{\partial^{2} f(x)}{\partial x_{1}^{2}} & \frac{\partial^{2} f(x)}{\partial x_{1} \partial x_{2}} & \cdots & \frac{\partial^{2} f(x)}{\partial x_{1} \partial x_{n}} \\
\frac{\partial^{2} f(x)}{\partial x_{2} \partial x_{1}} & \frac{\partial^{2} f(x)}{\partial x_{2}^{2}} & \cdots & \frac{\partial^{2} f(x)}{\partial x_{2} \partial x_{n}} \\
\vdots & \vdots & \ddots & \vdots \\
\frac{\partial^{2} f(x)}{\partial x_{n} \partial x_{1}} & \frac{\partial^{2} f(x)}{\partial x_{n} \partial x_{2}} & \cdots & \frac{\partial^{2} f(x)}{\partial x_{n}^{2}}
\end{array}\right]\\
\left(\nabla_{x}^{2} f(x)\right)_{i j}=\frac{\partial^{2} f(x)}{\partial x_{i} \partial x_{j}}\\
\nabla_{x}^{2} f(x)=\left[\begin{array}{llll}
\nabla_{x}\left(\nabla_{x} f(x)\right)_{1} & \nabla_{x}\left(\nabla_{x} f(x)\right)_{2} & \cdots & \nabla_{x}\left(\nabla_{x} f(x)\right)_{n}
\end{array}\right]
$$

### Gradients and Hessians of Quadratic and Linear Functions

For $x \in \mathbb{R}^{n}$, let $f(x)=b^{T} x$ for some vector $b \in \mathbb{R}^{n}$.

$$
f(x)=\sum_{i=1}^{n} b_{i} x_{i}\\
\frac{\partial f(x)}{\partial x_{k}}=\frac{\partial}{\partial x_{k}} \sum_{i=1}^{n} b_{i} x_{i}=b_{k}\\
\nabla_{x} b^{T} x=b
$$

Let's now think of a Quadratic function.

$$
f(x)=x^{T} A x\\
f(x)=\sum_{i=1}^{n} \sum_{j=1}^{n} A_{i j} x_{i} x_{j}
$$

$$
\begin{aligned}
\frac{\partial f(x)}{\partial x_{k}} &=\frac{\partial}{\partial x_{k}} \sum_{i=1}^{n} \sum_{j=1}^{n} A_{i j} x_{i} x_{j} \\
&=\frac{\partial}{\partial x_{k}}\left[\sum_{i \neq k} \sum_{j \neq k} A_{i j} x_{i} x_{j}+\sum_{i \neq k} A_{i k} x_{i} x_{k}+\sum_{j \neq k} A_{k j} x_{k} x_{j}+A_{k k} x_{k}^{2}\right] \\
&=\sum_{i \neq k} A_{i k} x_{i}+\sum_{j \neq k} A_{k j} x_{j}+2 A_{k k} x_{k} \\
&=\sum_{i=1}^{n} A_{i k} x_{i}+\sum_{j=1}^{n} A_{k j} x_{j}=2 \sum_{i=1}^{n} A_{k i} x_{i}
\end{aligned}
$$

The last equality holds since the $A$ is symmetric, because it was in a quadratic form. Therefore, 

$$
\nabla_{x} x^{T} A x=2 A x
$$

### Least Squares

Suppose we have a matrix $A \in \mathbb{R}^{m \times n}$ and a vector $b \in \mathbb{R}^{m}$ such that $b \notin \mathcal{R}(A)$. Since vector $b$ is not in range of $A$, there are no $x$ that satisfies $A x=b$. From this condition, we want to find a vector $x$ such that $Ax$ is as close as possible to b, which is measured as $\|A x-b\|_{2}^{2}$.

$$
\begin{aligned}
\|A x-b\|_{2}^{2} &=(A x-b)^{T}(A x-b) \\
&=x^{T} A^{T} A x-2 b^{T} A x+b^{T} b
\end{aligned}\\
\begin{aligned}
\nabla_{x}\left(x^{T} A^{T} A x-2 b^{T} A x+b^{T} b\right) &=\nabla_{x} x^{T} A^{T} A x-\nabla_{x} 2 b^{T} A x+\nabla_{x} b^{T} b \\
&=2 A^{T} A x-2 A^{T} b
\end{aligned}
$$

Therefore, we can get the solution for $x$.

$$
x=\left(A^{T} A\right)^{-1} A^{T} b
$$

## Reference

All the sentences and contents are from the Linear Algebra Review and Reference from the cs229 lecture of stanford.