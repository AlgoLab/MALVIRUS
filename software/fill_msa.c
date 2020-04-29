#include <stdio.h>
#include <zlib.h>

#include "kseq.h"

KSEQ_INIT(gzFile, gzread)
      
int main(int argc, char *argv[]) {
  gzFile fp;
  kseq_t *seq;
  int l;
  if (argc == 1) {
    fprintf(stderr, "Usage: %s <in.seq>\n", argv[0]);
    return 1;
  }
  fp = gzopen(argv[1], "r");
  seq = kseq_init(fp);

  // Get reference (first entry)
  l = kseq_read(seq);
  char ref[seq->seq.l+1];
  int ref_len = seq->seq.l;
  strcpy(ref, seq->seq.s);
  ref[ref_len+1] = '\0'; // maybe useless
  fprintf(stdout, ">%s\n%s\n", seq->name.s, ref);

  char curr_seq[ref_len+1];
  while ((l = kseq_read(seq)) >= 0) {
    for(int i = 0; i<ref_len; ++i) {
      char c = seq->seq.s[i]; 
      if(c == 'A' || c == 'C' || c == 'G' || c == 'T' ||
	 c == 'a' || c == 'c' || c == 'g' || c == 't') // maybe we can use toupper ?
	curr_seq[i] = c;
      else
	curr_seq[i] = ref[i];
    }
    curr_seq[ref_len] = '\0'; // maybe useless
    fprintf(stdout, ">%s\n%s\n", seq->name.s, curr_seq);
  }

  kseq_destroy(seq);
  gzclose(fp);
  return 0;  
} 
