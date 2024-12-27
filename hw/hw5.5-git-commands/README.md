# Git Commands

## `git clone projectPath`

- Creates a copy of a remote repository on your local machine
  
## `git pull`

- Fetches changes from remote repository AND merges them into your current branch
- `git fetch` + `git merge`

## `git checkout [branchName]`

- Switches to an existing branch

## `git branch [branchName]`

- Creates a new branch

## `git checkout -b [branchName]`

- Creates a new branch AND switches to it
- `git branch [branchName]` + `git checkout [branchName]`

## `git branch`

- Lists all local branches

## `git add .`

- Stages all changes in current directory for commit

## `git commit`

- Creates a snapshot of staged changes

## `git log`

- Shows commit history

## `git push`

- Uploads local branch commits to remote repository

## `git merge`

- Combines changes from one branch into current branch
  
## `git reset` vs `git revert`

### `git reset`

- Moves branch pointer backwards, effectively "undoing" commits
- Can be dangerous as it changes history

### `git revert`

- Creates new commit that undoes previous changes
- Safer as it doesn't alter history

## `git merge` vs `git rebase`

### `git merge`

- Creates a new merge commit
- Preserves complete history
- Better for public branches

### `git rebase`

- Moves commits to tip of target branch
- Creates linear history
- Better for private branches
- Can rewrite history

## `git pull` vs `git fetch`

### `git pull`

- Fetches AND merges changes
- One step operation
- Can cause conflicts

### `git fetch`

- Only downloads new data
- Doesn't integrate changes
- Safer as it lets you review changes before merging
