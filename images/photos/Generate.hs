#!/usr/bin/env runhaskell

import Data.List (partition)
import System.Cmd (rawSystem)
import System.Directory (getDirectoryContents)
import System.Posix.Files (getFileStatus, isDirectory)
import System.FilePath.Posix ((</>))
import Development.Shake.FilePath (splitExtension, takeDirectory)
import Control.Monad (liftM)

filterOut :: (a -> Bool) -> [a] -> [a]
filterOut p = filter (not . p)

getDirectoryContentsSensible :: FilePath -> IO [FilePath]
getDirectoryContentsSensible d = do
  contents' <- getDirectoryContents d
  let contents = filterOut (\f -> f == "." || f == "..") contents'
  return $ map (d </>) contents

partitionIO :: (a -> IO Bool) -> [a] -> IO ([a], [a])
partitionIO p [] = return ([], [])
partitionIO p (x:xs) = do
  (lefts, rights) <- partitionIO p xs
  yes <- p x
  return (if yes then (x:lefts, rights) else (lefts, x:rights))

fileIsDirectory f = liftM isDirectory $ getFileStatus f

getDirectoryFilesRecursive :: FilePath -> IO [FilePath]
getDirectoryFilesRecursive dir = do
  contents <- getDirectoryContentsSensible dir
  (dirs, files) <- partitionIO fileIsDirectory contents
  rest <- mapM getDirectoryFilesRecursive dirs
  return $ files ++ (concat rest)

convert from = do
  mkdirp $ takeDirectory to
  rawSystem "convert" [from, "-resize", "x800", to]
  where
    (f, e) = splitExtension from
    to = "build" </> (f ++ "_800.jpg")

mkdirp d = do
  putStrLn $ "Making " ++ d
  rawSystem "mkdir" ["-p", d]

run [] = putStrLn "Done."
run (f:fs) = do
  putStrLn $ "Doing " ++ f
  convert f
  run fs

main = do
  files <- getDirectoryFilesRecursive "src"
  let do_files = filter ((==".jpg") . snd. splitExtension) files
  run do_files
